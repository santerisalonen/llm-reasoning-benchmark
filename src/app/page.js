"use client";

import {useState, useEffect} from 'react';
import {SimpleGrid, Tabs, Container, Blockquote, Stack, Table,  Center, Box, Title, Text, Group, Button, Image, Card, Badge, Divider, Skeleton, Loader, Paper} from '@mantine/core';
import Link from 'next/link';

import answers from '@/../scripts/data/answers.yml';
import {Summaries} from '@/../scripts/data/summary.yml';

import LeaderBoard from '@/components/LeaderBoard';
import AnswerBarChart from '@/components/AnswerBarChart';

import {InfoIcon} from 'lucide-react';

import Markdown from 'react-markdown';

export default function Home() {
  const allQuestions = answers.Questions;
  const unassistedQuestions = answers.Questions.filter(q => !q.Assisted);
  const assistedQuestions = answers.Questions.filter(q => q.Assisted);

  // Update stats to use pre-calculated averageWordCount
  const overallStats = Summaries.models.map((model) => ({
    description: model.overall,
    score: model.averageScore,
    name: model.model,
    avgWords: model.averageWordCount,
    reasoningModel: model.reasoningModel
  }));

  const unassistedStats = Summaries.unAssisted.map((model) => ({
    description: model.overall,
    score: model.averageScore,
    name: model.model,
    avgWords: model.averageWordCount
  }));

  const assistedStats = Summaries.assisted.map((model) => ({
    description: model.overall,
    score: model.averageScore,
    name: model.model,
    avgWords: model.averageWordCount
  }));

  return (
    <Container size="sm">

      <Text ff="monospace">
        Welcome to the LLM Reasoning Benchmark, designed to assess and compare the cognitive capabilities of large language models (LLMs) in complex reasoning tasks. 
      </Text>
      <Text mt="md" ff="monospace" size="xs">
        LLM Reasoning Benchmark is a website maintained by <Link href="https://www.linkedin.com/in/santerisalonen/">Santeri Salonen.</Link> This is work in progress and I will add new models and questions periodically.
      </Text>

      <Divider my="xl" />

      
      <Title mb="md" order={2}>Overall performance</Title>
      
  
      <LeaderBoard 
        data={overallStats}
        showReasoningModels={true}
        maxResults={10}
      />

      <Title mt="xl" order={3}>Unassisted performance</Title>

      <Text mt="sm" c="dimmed" mb="md">Unassisted questions test an AI model's reasoning abilities without additional guidance. The model is presented with a problem or scenario and must rely on its existing knowledge and reasoning capabilities. These questions mimick real-world situations and often involve complex scenarios that may require nuanced thinking, recognition of non-obvious factors, or the ability to avoid common cognitive biases.</Text>

      <LeaderBoard 
        data={unassistedStats}
        maxResults={3}
      />

      <Title mt="xl" order={3}>Assisted performance</Title>

      <Text mt="sm" c="dimmed" mb="md">Assisted questions provide the AI model with additional information to guide its reasoning process. The assistance typically comes in the form of a suggestion that points towards a key concept related to solving the problem. The assisted format evaluates how effectively the model can utilize supplementary information to enhance its problem-solving capabilities.</Text>

      <LeaderBoard 
        data={assistedStats}
        maxResults={3}
      />


      <Title mt="xl" order={3}>Questions</Title>

      {answers.Questions.map((question, index) => {
        return (
          <Box my="xl" key={question.QuestionId}>
            <Group>
              <Title order={4}>{`Question #${index + 1}`}</Title>
              {question.Assisted ? (
                <Badge color="green.6">Assisted</Badge>
              ) : <Badge color="gray.6">Unassisted</Badge>}
            </Group>


            <Blockquote p="xs" my="xs">
              <Markdown>{question.QuestionText.replace(/\n/g, '\n\n')}</Markdown>
            </Blockquote>

            <Paper p="md" mb="xl">
              <Title order={5} mb="md">Expert Answer</Title>
              <Text>{question.ExpertAnswer}</Text>
            </Paper>

            <AnswerBarChart question={question} summaries={Summaries} />
          </Box>
        )
      })}


      <Divider my="xl" />      



    </Container>
  );
}