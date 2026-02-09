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
  },
  // new models
  {
    name: "claude-3-7-sonnet-20250219",
    model: anthropic('claude-3-7-sonnet-20250219'),
    useForReview: true,
    useForSummary: true
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
  // Latest models (2025-2026)
  {
    name: 'gpt-5.2-2025-12-11',
    model: openai('gpt-5.2-2025-12-11'),
    reasoningModel: true
  },
  {
    name: 'gpt-5-mini-2025-08-07',
    model: openai('gpt-5-mini-2025-08-07'),
    reasoningModel: true,
    disableTemperature: true
  },
  {
    name: 'gpt-5-nano-2025-08-07',
    model: openai('gpt-5-nano-2025-08-07'),
    reasoningModel: false,
    disableTemperature: true
  },
  {
    name: 'gemini-3-pro-preview',
    model: google('models/gemini-3-pro-preview'),
    reasoningModel: true
  },
  {
    name: 'gemini-3-flash-preview',
    model: google('models/gemini-3-flash-preview'),
    reasoningModel: false
  },
  {
    name: 'claude-opus-4-5-20251101',
    model: anthropic('claude-opus-4-5-20251101'),
    reasoningModel: true
  },
  {
    name: 'claude-sonnet-4-5-20250929',
    model: anthropic('claude-sonnet-4-5-20250929'),
    reasoningModel: true
  },
  {
    name: 'claude-haiku-4-5-20251001',
    model: anthropic('claude-haiku-4-5-20251001'),
    reasoningModel: false
  },
  {
    name: 'qwen3-max-2025-09-23',
    model: qwen('qwen3-max-2025-09-23'),
    reasoningModel: false
  },
  {
    name: 'qwen-flash-2025-07-28',
    model: qwen('qwen-flash-2025-07-28'),
    reasoningModel: false
  },
  {
    name: "test-model",
    method: "manual"
  }
]