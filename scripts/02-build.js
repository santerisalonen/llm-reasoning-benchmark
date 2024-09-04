
import fs from 'fs';
const configPath = './data/config.yaml';
const logFilePath = './data/log.jsonl';
const outFilePatH = './data/data.yml';

import {keepOnlyLatestAnswerForAModel, writeQuestionsAndAnswers, getJsonLines, getConfig} from './utils.js';



(async () => {

  let config = await getConfig(configPath);
  const answers = keepOnlyLatestAnswerForAModel( getJsonLines(logFilePath) );

  for (let question of config.Questions) {
    let matchingAnswers = answers.filter((ans) => {
      return ans.questionId == question.QuestionId
    })
    question.Answers = matchingAnswers;
  }

  writeQuestionsAndAnswers(outFilePatH, config)





})();