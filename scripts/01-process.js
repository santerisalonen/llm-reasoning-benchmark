
import {generateObject, generateText} from 'ai';

import models from './models.js';
import { z } from "zod";
import dotenv from 'dotenv';
import clc from "cli-color";

import {askAnswerText, askDate, confirm, getConfig, appendToLog} from './utils.js';

const configPath = './data/config.yaml';
const logFilePath = './data/log.jsonl';


(async () => {
  dotenv.config();
  const config = await getConfig(configPath);
  const date = await askDate();
  const questions = config.Questions;
  
  for (const model of models) {
    if (await confirm(`Process ${model.name}`)) {
      
      console.log(clc.green(`process ${model.name}`));

      for (const question of questions) {

        console.log(`-------------- question ----------------`);
        console.log(question.QuestionText);

        let answerText, method;

        if (!model.model) {
          const text = await askAnswerText();
          answerText = text;
          method = 'MANUAL';
        }
        else {
          const { text } = await generateText({
            model: model.model,
            prompt: question.QuestionText,
          });
          answerText = text;
          method = 'API';
        }

        console.log(`-------------- ${model.name} ----------------`);
        console.log(answerText)

        const reviewPrompt = `Your task is to review responses of students. 
        
        You will be provided with the question and student's response.
        
        Questions might be tricky and they can have a simple but wrong surface solution. Questions test student's reasoning skills and ability to adapt their answers based on context.

        Use the expert response as a benchmark when evaluating the quality of student's answer.
        
        Provide quality score (1-5) as well as reasoning for the quality score. Do not give high scores easily.

        Also provide evaluation of the correctedness of student's answers (true or false)
        
        # Question

        ${question.QuestionText}

        # Expert answer

        ${question.ExpertAnswer}

        # Student answer

        ${answerText}
        `;

        const reviews = [];

        const reviewModels = models.filter((model) => model.useForReview );
        if (!reviewModels || reviewModels.length === 0) {
          throw new Error(`One model must be assigned as review model (useForReview)`)
        }
        for (const reviewModel of reviewModels) {
          const {object: reviewObject} = await generateObject({
            model: reviewModel.model,
            schema: z.object({
              qualityScore: z.number().describe("Quality score for student's response"),
              evaluateText: z.string().describe("Reasoning behind the given quality score"),
              correctness: z.boolean().describe("Is the student's answer true or not"),            
            }),
            prompt: reviewPrompt,
          });
          reviews.push({model: reviewModel.name, ...reviewObject});
          console.log(`--------- review ${reviewModel.name} ------------`)
          console.log(reviewObject)
        }
        
        await appendToLog(logFilePath, {
          timestamp: new Date().getTime(),
          date: date,
          model: model.name,
          method: method,
          answerText: answerText,
          questionId: question.QuestionId,
          reviews: reviews
        })
      }
    }
    else {
      console.log(clc.red(`skip ${model.name}`))
    }
  }


  /*

  const data = await loadData();
  const date = await askDate();

  let existingAnswerIndex = data.Answers.findIndex((setOfAnswers) => {
    if (typeof setOfAnswers.Date === 'Date') return date === setOfAnswers.Date.toIsoString().slice(0,10)
    else return date === setOfAnswers.Date;
  });
  const existingAnswers = (existingAnswerIndex > -1) ? data.Answers[existingAnswerIndex].Answers : [];
  
  for (const model of models) {

    if (await confirm(`Process ${model.name}`)) {
    
      console.log(clc.green(`process ${model.name}`));

      const { text } = await generateText({
        model: model.model,
        prompt: 'Tell a joke where a person goes to barbershop. Make the punchline little bit controversial.',
      });

      console.log(text);
      existingAnswers.push({
        QuestionId: 'test',
        Model: model.name,
        Method: 'API',
        AnswerText: text
      })

      console.log(`writing data`);
      
      console.log(data);

      await writeData(data);
    
    }

    else {
      console.log(clc.red(`skip ${model.name}`))

    }


    /*
    let {name} = await prompt.get({
      properties: {
        name: {
          type:"string",
          message: "Say your name pleease"
        }
      }
    });
    console.log(name);
   
  }
   */
  





})();


/*
const writeData = async (data) => {
  try {
    fs.writeFileSync('./data/data.yml', yaml.dump(data)); 
  } 
  catch (e) {
    console.log(e);
  }
}
*/