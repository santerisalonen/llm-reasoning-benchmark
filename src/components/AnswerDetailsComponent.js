import { Tabs, Text, Badge, Group } from '@mantine/core';
import Markdown from 'react-markdown';

export default function AnswerDetailsComponent({ question }) {
  return (
    <Tabs defaultValue="answers">
      <Tabs.List>
        <Tabs.Tab value="answers">
          Answers
        </Tabs.Tab>
        <Tabs.Tab value="reviews">
          Reviews
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="answers">
        <Tabs color="teal" defaultValue="expert" orientation="vertical" p={0} mt="lg">
          <Tabs.List>
            <Tabs.Tab value="expert">
              Expert answer
            </Tabs.Tab>
            {question.Answers.map((ans, index) => {
              return (
                <Tabs.Tab key={ans.model + '-tab'} value={ans.model + index} color="blue">
                  {ans.model}
                </Tabs.Tab>
              )
            })}
          </Tabs.List>
          <Tabs.Panel value="expert" p="lg">
            <Text>{question.ExpertAnswer}</Text>
          </Tabs.Panel>
          {question.Answers.map((ans, index) => {
            return (
              <Tabs.Panel key={ans.model + '-panel'} value={ans.model + index} p="lg">
                <Markdown>{ans.answerText}</Markdown>
              </Tabs.Panel>
            )
          })}
        </Tabs>
      </Tabs.Panel>
      <Tabs.Panel value="reviews">
        <Tabs color="teal" defaultValue={question.Answers[0].model + '0'} orientation="vertical" p={0} mt="lg">
          <Tabs.List>
            {question.Answers.map((ans, index) => {
              return (
                <Tabs.Tab key={ans.model + '-answer-tab'} value={ans.model + index} color="blue">
                  {ans.model}
                </Tabs.Tab>
              )
            })}
          </Tabs.List>
          {question.Answers.map((ans, index) => {
            return (
              <Tabs.Panel key={ans.model + '-answer'} value={ans.model + index} p="lg">
                <Group mb="md">
                  <Group>
                    <Text>Score:</Text><Badge color="gray.8">{ans.reviews[0].qualityScore}</Badge>
                  </Group>
                  <Group>
                    <Text>Correctness:</Text><Badge color="gray.8">{ans.reviews[0].correctness.toString()}</Badge>
                  </Group>
                </Group>

                <Markdown>{ans.reviews[0].evaluateText}</Markdown>
              </Tabs.Panel>
            )
          })}
        </Tabs>
      </Tabs.Panel>
    </Tabs>
  );
} 