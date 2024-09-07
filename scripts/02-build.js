
import fs from 'fs';
const configPath = './data/config.yaml';
const logFilePath = './data/log.jsonl';
const outFilePatH = './data/answers.yml';

import {keepOnlyLatestAnswerForAModel, writeToYaml, getJsonLines, getConfig} from './utils.js';


(async () => {

  let config = await getConfig(configPath);
  const answers = keepOnlyLatestAnswerForAModel( getJsonLines(logFilePath) );
  console.log(`Found ${answers.length} total answers`)

  for (let question of config.Questions) {
    console.log(`##### ----`)
    console.log(`processing question ${question.QuestionId}`)
    
    let matchingAnswers = answers.filter((ans) => {
      return ans.questionId == question.QuestionId
    })
    console.log(`found ${matchingAnswers.length} answers`)
    question.Answers = matchingAnswers;

  }

  writeToYaml(outFilePatH, config)





})();