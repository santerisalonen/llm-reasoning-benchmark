import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { anthropic } from '@ai-sdk/anthropic';
import { qwen } from 'qwen-ai-provider';
import { deepseek } from '@ai-sdk/deepseek';

export default [
  {
    name: 'gpt-4-turbo-2024-04-09',
    model: openai('gpt-4-turbo-2024-04-09'),
    reasoningModel: false
  },
  {
    name: 'gpt-4o-2024-05-13',
    model: openai('gpt-4o-2024-05-13'),
    reasoningModel: false
  },
  {
    name: "gemini-2.5-pro-exp-03-25",
    model: google('models/gemini-2.5-pro-exp-03-25'),
    reasoningModel: true
  },
  {
    name: "gemini-2.0-flash-001",
    model: google('models/gemini-2.0-flash-001'),
    reasoningModel: false
  },
  {
    name: "gemini-2.0-flash-lite",
    model: google('models/gemini-2.0-flash-lite'),
  },
  {
    name: "gemini-1.5-flash",
    model: google('models/gemini-1.5-flash'),
  },
  {
    name: 'claude-3-haiku-20240307',
    model: anthropic('claude-3-haiku-20240307'),
  },
  {
    name: 'claude-3-5-sonnet-20240620',
    model: anthropic('claude-3-5-sonnet-20240620'),
    useForReview: true,
    useForSummary: true
  },
  // new models
  {
    name: "claude-3-7-sonnet-20250219",
    model: anthropic('claude-3-7-sonnet-20250219'),
  },
  {
    name: "deepseek-chat",
    model: deepseek('deepseek-chat')
  },
  {
    name: "deepseek-reasoner",
    model: deepseek('deepseek-reasoner'),
    reasoningModel: true
  },
  {
    name: 'o3-mini-2025-01-31',
    model: openai('o3-mini-2025-01-31'),
    reasoningModel: true
  },
  {
    name: "o1-mini-2024-09-12",
    model: openai('o1-mini-2024-09-12'),
    reasoningModel: true
  },
  {
    name: "o1-2024-12-17",
    model: openai('o1-2024-12-17'),
    reasoningModel: true
  },
  {
    name: 'qwen-max-2025-01-25',
    model: qwen('qwen-max-2025-01-25'),
  },
  {
    name: 'qwen-plus-2025-01-25',
    model: qwen('qwen-plus-2025-01-25'),
  },
  {
    name: "test-model",
    method: "manual"
  }
]