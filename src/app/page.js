"use client";

import {useState, useEffect} from 'react';
import {SimpleGrid, Tabs, Container, Blockquote, Table, Center, Box, Title, Text, Group, Button, Image, Card, Badge, Divider, Skeleton, Loader} from '@mantine/core';
import Link from 'next/link';

import answers from '@/../scripts/data/answers.yml';
import {Summaries} from '@/../scripts/data/summary.yml';

import LeaderBoard from '@/components/LeaderBoard';

import {InfoIcon} from 'lucide-react';


export default function Home() {

  return (
    <Container size="sm">

      <Text ff="monospace">
        Welcome to the LLM Reasoning Benchmark, designed to assess and compare the cognitive capabilities of large language models (LLMs) in complex reasoning tasks. 
      </Text>
     
      <Divider my="xl" />

      
      <Title mb="md" order={2}>Overall performance</Title>
      
  
      <LeaderBoard data={Summaries.models.map((model) => {
        return {
          description: model.overall,
          score: model.averageScore,
          name: model.model
        }
      })} />

      <Title mt="xl" order={3}>Unassisted performance</Title>

      <Text mt="sm" c="dimmed" mb="md">Unassisted questions test an AI model's reasoning abilities without additional guidance. The model is presented with a problem or scenario and must rely on its existing knowledge and reasoning capabilities. These questions mimick real-world situations and often involve complex scenarios that may require nuanced thinking, recognition of non-obvious factors, or the ability to avoid common cognitive biases.</Text>

      <LeaderBoard data={Summaries.unAssisted.map((model) => {
        return {
          description: model.overall,
          score: model.averageScore,
          name: model.model
        }
      })} />

      <Title mt="xl" order={3}>Assisted performance</Title>

      <Text mt="sm" c="dimmed" mb="md">Assisted questions provide the AI model with additional information to guide its reasoning process. The assistance typically comes in the form of a suggestion that points towards a key concept related to solving the problem. The assisted format evaluates how effectively the model can utilize supplementary information to enhance its problem-solving capabilities.</Text>

      <LeaderBoard data={Summaries.assisted.map((model) => {
        return {
          description: model.overall,
          score: model.averageScore,
          name: model.model
        }
      })} />


      <Title mt="xl" order={3}>Questions</Title>

      {answers.Questions.map((question, index) => {
        return (
          <Box my="lg">
            <Title order={4}>{question.Theme}</Title>
            <Text>{question.QuestionText}</Text>
            <Tabs color="teal" defaultValue="first" orientation="vertical" p="sm" mt="lg">
              <Tabs.List>
                <Tabs.Tab value="first">
                  Expert answer
                </Tabs.Tab>
                <Tabs.Tab value="second" color="blue">
                  Blue tab
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="first" p="lg">
                    {question.ExpertAnswer}
            
              </Tabs.Panel>

              <Tabs.Panel value="second" pt="xs">
                Second tab color is blue, it gets this value from props, props have the priority and will
                override context value
              </Tabs.Panel>
            </Tabs>

          
          </Box>
        )
      })}



      <Divider my="xl" />


      {JSON.stringify(Summaries)}

      

    </Container>
  );
}
