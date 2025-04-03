import {generateObject, generateText} from 'ai';
import {getData, writeToYaml, fileExists} from './utils.js';
import models from './models.js';
import { z } from 'zod';
import dotenv from 'dotenv';
import readline from 'readline';


const answersFile = './data/answers.yml';
const outFilePatH = './data/summary.yml';


const groupAnswers = (questionsWithReviews) => {
  let out = {};
  for (const question of questionsWithReviews) {
    for (const answer of question.Answers) {
      for (const review of answer.reviews) {
        out[answer.model] = out[answer.model] || [];
        out[answer.model].push({
          assisted: question.Assisted,
          ...review
        });
      }
    }
  }
  return out;
}

const promptUser = async (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
};



(async () => {
  dotenv.config();
  const questions = await getData(answersFile);
  let summaries = {models: [], assisted: [], unAssisted: []};
  
  // Load existing summaries if file exists
  let existingSummaries = {};
  if (await fileExists(outFilePatH)) {
    existingSummaries = await getData(outFilePatH);
    existingSummaries = existingSummaries.Summaries || {};
  }

  const shouldReEvaluate = await promptUser('Do you want to re-evaluate question answers? (y/n): ');

  const groupedAnswers = groupAnswers(questions.Questions);

  for (const model of Object.keys(groupedAnswers)) {
    console.log(model);


    const unAssistedReviews = groupedAnswers[model].filter((ans) => {
      return !ans.assisted
    })
    const assistedReviews = groupedAnswers[model].filter((ans) => {
      return ans.assisted
    })

    // Calculate average word count from questions.Questions
    const modelAnswers = questions.Questions.flatMap(q => 
      q.Answers.filter(a => a.model === model && !q.Assisted)
    );
    
    const unAssistedWordCount = Math.round(
      modelAnswers.reduce((total, answer) => {
        const wordCount = answer.answerText?.split(/\s+/).filter(word => word.length > 0).length || 0;
        return total + wordCount;
      }, 0) / modelAnswers.length
    );

    const assistedAnswers = questions.Questions.flatMap(q => 
      q.Answers.filter(a => a.model === model && q.Assisted)
    );
    
    const assistedWordCount = Math.round(
      assistedAnswers.reduce((total, answer) => {
        const wordCount = answer.answerText?.split(/\s+/).filter(word => word.length > 0).length || 0;
        return total + wordCount;
      }, 0) / (assistedAnswers.length || 1) // avoid division by zero
    );

    const averageScoreAssisted = Math.round(assistedReviews.reduce((val, obj) => {
      return obj.qualityScore + val
    }, 0) / assistedReviews.length * 100) / 100;
    const averageScoreUnAssisted = Math.round(unAssistedReviews.reduce((val, obj) => {
      return obj.qualityScore + val
    }, 0) / unAssistedReviews.length * 100) / 100;


    console.log(`un assisted: ${unAssistedReviews.length}, average score: ${averageScoreUnAssisted}`)
    console.log(`assisted: ${assistedReviews.length}, average score: ${averageScoreAssisted}`)


    summaries.unAssisted.push({ 
      model: model, 
      averageScore: averageScoreUnAssisted,
      averageWordCount: unAssistedWordCount
    });  
    
    summaries.assisted.push({ 
      model: model, 
      averageScore: averageScoreAssisted,
      averageWordCount: assistedWordCount
    });
    
    
    let unAssistedSummary;
    const existingModelSummary = existingSummaries.models?.find(m => m.model === model);

    if (!shouldReEvaluate && existingModelSummary) {
      // Use existing summary if available and user chose not to re-evaluate
      unAssistedSummary = {
        overall: existingModelSummary.overall,
        strenghts: existingModelSummary.strenghts,
        weaknesses: existingModelSummary.weaknesses
      };
      console.log(`Using existing summary for ${model}`);
    } else {
      // Generate new summary
      const summaryModel = models.find((model) => model.useForSummary);
      const instructionPrompt = `Your job is to summarize performance of AI models based on reviews they have gotten. In the reviews word Student refers to the AI model. Focus on reasoning abilities, ability to apply theoretical knowledge and critical thinking skills. You will be provided with detailed reviews of their answers. Summarize the key points from these answers.\n\n`;

      const unAssistedReviewsText = unAssistedReviews.map((review, index) => {
        return `Review No: ${index}\n\n${review.evaluateText}\n\nScore given (max 5): ${review.qualityScore}\n\nCorrectness: ${review.correctness}`
      }).join('\n\n');

      const schema = z.object({
        overall: z.string().describe("Overall max 200 characters summary of the performance based on reviews"),
        strenghts: z.array(
          z.string()
        ).describe("List 3-4 main strenghts based on reviews"),        
        weaknesses: z.array(
          z.string()
        ).describe("List 3-4 main weaknesses based on reviews"),       
      });
      
      const {object: generatedSummary} = await generateObject({
        model: summaryModel.model,
        schema: schema,
        prompt: instructionPrompt + unAssistedReviewsText,
      });
      unAssistedSummary = generatedSummary;
    }

    // Find if this is a reasoning model
    const modelConfig = models.find(m => m.name === model);
    const isReasoningModel = modelConfig?.reasoningModel || false;

    summaries.models.push({
      model: model, 
      averageScore: Math.round((averageScoreAssisted + averageScoreUnAssisted) / 2 * 100) / 100,
      reasoningModel: isReasoningModel,
      averageWordCount: unAssistedWordCount,
      ...unAssistedSummary
    });
    console.log(`summarized ${model} OK`)
  
  }
  writeToYaml(outFilePatH, {
    Summaries: summaries
  })



  /*

  */

})();