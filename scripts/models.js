import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';

export default [
  {
    name: 'gpt-4-turbo-2024-04-09',
    model: openai('gpt-4-turbo-2024-04-09'),
  },
  {
    name: 'gpt-4o-2024-05-13',
    model: openai('gpt-4o-2024-05-13'),
  },
  {
    name: 'gemini-1.0-pro-001',
    model: google('models/gemini-1.0-pro-001'),
  },
  {
    name: 'claude-3-haiku-20240307',
    model: anthropic('claude-3-haiku-20240307'),
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