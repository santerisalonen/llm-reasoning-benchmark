
import prompt from 'prompt-async';
import yaml from 'js-yaml';
import fs from 'fs';
// import path from 'path';
import clc from "cli-color";

prompt.start();

export const getConfig = async (configPath) => {
  try {
    const file = fs.readFileSync(configPath, 'utf-8');
    const doc = yaml.load(file);
    return doc;
  } catch (e) {
    console.log(e);
  }
};
export const appendToLog = async (logFilePath, obj) => {
  try {
    const jsonString = JSON.stringify(obj);
    fs.appendFileSync(logFilePath, jsonString + '\n');
    console.log(`Successfully wrote to log file ${logFilePath}`);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
};

export const confirm = async (text) => {
  let {confirm} = await prompt.get({properties: {
    confirm: {
      type:"string", 
      default:"y", 
      pattern: /^[NnYy]$/,
      description: `${text} y/n`,
      before: (v) => v.toLowerCase() === 'y'
    }
  }});
  return confirm;
}
export const askDate = async () => {
  let {confirm} = await prompt.get({properties: {
    confirm: {
      type:"string", 
      default: new Date().toISOString().slice(0,10), 
      pattern: /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
      description: `Provide a date to process`,
    }
  }});
  return confirm;
}
export const askAnswerText = async() => {
  let {text} = await prompt.get({properties: {
    text: {
      type:"string", 
      description: `Provide the answer`,
    }
  }});
  return text;
}