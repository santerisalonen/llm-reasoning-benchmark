
import prompt from 'prompt-async';
import yaml from 'js-yaml';
import fs from 'fs';
// import path from 'path';
import clc from "cli-color";

prompt.start();

export const getJsonLines = (path) => {
  const contents = fs.readFileSync(path, 'utf-8');
  const array = contents.split('\n').map((row) => {
    try {
      return JSON.parse(row);
    }
    catch(e) {
      return null;
    }
  }).filter(row => row)
  console.log(`array length ${array.length}`)
  return array;
}

export const keepOnlyLatestAnswerForAModel = (arr) => {
  // Create a Map to store the latest object for each model
  const latestByModel = new Map();
  // Iterate through the array
  for (const obj of arr) {
    const key = `${obj.model}-${obj.questionId};`
    const currentDate = new Date(obj.date);
    // If the model doesn't exist in the Map, or if the current date is later,
    // update the Map with the current object
    if (!latestByModel.has(key) || currentDate > new Date(latestByModel.get(key).date)) {
      latestByModel.set(key, obj);
    }
  }
  // Convert the Map values back to an array
  return Array.from(latestByModel.values());
}
export const writeToYaml = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, yaml.dump(data), 'utf-8');
    console.log(clc.green(`wrote output file ${filePath}`))
  } catch (e) {
    console.log(e);
  }
}
export const getData = async (dataFilePath) => {
  try {
    const file = fs.readFileSync(dataFilePath, 'utf-8');
    const doc = yaml.load(file);
    return doc;
  } catch (e) {
    console.log(e);
  }
};
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