import {generateObject, generateText} from 'ai';
import {getData, writeToYaml} from './utils.js';
import models from './models.js';
import { z } from 'zod';
import dotenv from 'dotenv';


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

(async () => {
  dotenv.config();
  const questions = await getData(answersFile);
  const summaries = {models: [], assisted: [], unAssisted: []};

  const groupedAnswers = groupAnswers(questions.Questions);

  for (const model of Object.keys(groupedAnswers)) {
    console.log(model);


    const unAssistedReviews = groupedAnswers[model].filter((ans) => {
      return !ans.assisted
    })
    const assistedReviews= groupedAnswers[model].filter((ans) => {
      return ans.assisted
    })

    const averageScoreAssisted = Math.round(assistedReviews.reduce((val, obj) => {
      return obj.qualityScore + val
    }, 0) / assistedReviews.length * 100) / 100;
    const averageScoreUnAssisted = Math.round(unAssistedReviews.reduce((val, obj) => {
      return obj.qualityScore + val
    }, 0) / unAssistedReviews.length * 100) / 100;


    console.log(`un assisted: ${unAssistedReviews.length}, average score: ${averageScoreUnAssisted}`)
    console.log(`assisted: ${assistedReviews.length}, average score: ${averageScoreAssisted}`)


    const summaryModel = models.find((model) => model.useForSummary );

    const instructionPrompt = `Your job is to summarize performance of AI models based on reviews they have gotten. In the reviews word Student refers to the AI model. Focus on reasoning abilities, ability to apply theoretical knowledge and critical thinking skills. You will be provided with detailed reviews of their answers. Summarize the key points from these answers.\n\n`;

    const unAssistedReviewsText = unAssistedReviews.map((review, index) => {
      return `Review No: ${index}\n\n${review.evaluateText}\n\nScore given (max 5): ${review.qualityScore}\n\nCorrectness: ${review.correctness}`
    }).join('\n\n')

    const assistedReviewsText =assistedReviews.map((review, index) => {
      return `Review No: ${index}\n\n${review.evaluateText}\n\nScore given (max 5): ${review.qualityScore}\n\nCorrectness: ${review.correctness}`
    }).join('\n\n')


    const schema = z.object({
      overall: z.string().describe("Overall summary of the performance based on reviews"),
      strenghts: z.array(
        z.string()
      ).describe("List 3-4 main strenghts based on reviews"),        
      weaknesses: z.array(
        z.string()
      ).describe("List 3-4 main weaknesses based on reviews"),       
    });
    

    const {object: unAssistedSummary} = await generateObject({
      model: summaryModel.model,
      schema: schema,
      prompt: instructionPrompt + unAssistedReviewsText,
    });

    summaries.unAssisted.push( {model: model, averageScore: averageScoreUnAssisted, ...unAssistedSummary});

    const {object: assistedSummary} = await generateObject({
      model: summaryModel.model,
      schema: schema,
      prompt: instructionPrompt + assistedReviewsText,
    });

    summaries.assisted.push( {model: model, averageScore: averageScoreAssisted, ...assistedSummary});


    const topLevelSummaryPrompt = `Create short executive summary of LLM model performance based on evaluation. Un-assisted performance means that model was not given specific hints how to solve the problem. Assisted performance means that the model was given specific hint how to solve the problem.

    # Un-assisted performance for model ${model}:

    Average quality score: ${averageScoreUnAssisted}

    Overall performance:  ${unAssistedSummary.overall}

    Strenghts:\n\n${unAssistedSummary.strenghts.join('\n\n')}

    Weaknesses:\n\n${unAssistedSummary.weaknesses.join('\n\n')}

    # Assisted performance for model ${model}:

    Average quality score: ${averageScoreAssisted}

    Overall performance:  ${assistedSummary.overall}

    Strenghts:\n\n${assistedSummary.strenghts.join('\n\n')}

    Weaknesses:\n\n${assistedSummary.weaknesses.join('\n\n')}
    `

    const {object: topLevelSummary} = await generateObject({
      model: summaryModel.model,
      schema: schema,
      prompt: topLevelSummaryPrompt,
    });

    summaries.models.push( {
      model: model, 
      averageScore: Math.round((averageScoreAssisted + averageScoreUnAssisted) / 2 * 100) / 100, 
      ...topLevelSummary
    });
    console.log(`summarized ${model} OK`)
 
  }
  writeToYaml(outFilePatH, {
    Summaries: summaries
  })



  /*

  */

})();