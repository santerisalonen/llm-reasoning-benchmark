
import prompt from 'prompt-async';
import {generateText} from 'ai';

import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';

import clc from "cli-color";

import dotenv from 'dotenv';
dotenv.config();

(async () => {

  prompt.start();

  const models = [
    {
      name: 'gpt-4-turbo',
      model: openai('gpt-4-turbo'),
    },
    {
      name: 'models/gemini-1.5-pro-latest',
      model: google('models/gemini-1.5-pro-latest'),
    },
    {
      name: 'claude-3-haiku-20240307',
      model: anthropic('claude-3-haiku-20240307'),
    }
  ]

  for (const model of models) {

    console.log(`Continue processing ${model.name}`)

    let {confirm} = await prompt.get({properties: {
      confirm: {
        type:"string", 
        default:"y", 
        pattern: /^[NnYy]$/,
        description: "Confirm Y/n",
        before: (v) => v.toLowerCase() === 'y'
      }
    }});

    if (!confirm) {
      console.log(clc.red(`skip ${model.name}`))
    }
    else {
      console.log(clc.green(`process ${model.name}`));


      const { text } = await generateText({
        model: model.model,
        prompt: 'Tell a joke where a person goes to barbershop. Make the punchline little bit controversial.',
      });

      console.log(text);




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
    */
  }





})();