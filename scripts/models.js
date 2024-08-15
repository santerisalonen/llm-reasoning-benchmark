import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';

export default [
  {
    name: 'gpt-4-turbo',
    model: openai('gpt-4-turbo'),
    useForReview: true,
  },
  {
    name: 'gemini-1.5-pro-latest',
    model: google('models/gemini-1.5-pro-latest'),
  },
  {
    name: 'claude-3-haiku-20240307',
    model: anthropic('claude-3-haiku-20240307'),
    useForReview: true,
  },
  {
    name: 'claude-3-5-sonnet-20240620',
    model: anthropic('claude-3-5-sonnet-20240620'),
    useForReview: true,
  },
  {
    name: "test-model",
    method: "manual"
  }
]