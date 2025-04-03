import { Paper, Title, Stack, Box, Text, Group } from '@mantine/core';
import { useState } from 'react';
import Markdown from 'react-markdown';

export default function AnswerBarChart({ question, summaries }) {
  const [selectedModel, setSelectedModel] = useState(null);

  // Get top 10 models based on overall score
  const topModels = [...summaries.models]
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 10)
    .map(model => model.model);

  // Get answers for top 10 models in the same order
  const sortedAnswers = topModels
    .map(modelName => question.Answers.find(ans => ans.model === modelName))
    .filter(Boolean); // Remove any undefined entries

  const maxScore = 5;

  const handleRowClick = (model) => {
    setSelectedModel(selectedModel === model ? null : model);
  };

  return (
    <Paper p="md" mb="xl">
      <Title order={5} mb="md">Top 10 Model Answers</Title>
      <Stack gap={0}>
        {sortedAnswers.map((ans, index) => {
          const score = ans.reviews[0].qualityScore;
          const isCorrect = ans.reviews[0].correctness;
          const barWidth = (score / maxScore) * 100;
          const isSelected = selectedModel === ans.model;
          const isOddRow = index % 2 === 1;

          return (
            <Box key={ans.model}>
              <Box 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '4px',
                  backgroundColor: isSelected 
                    ? 'var(--mantine-color-gray-0)' 
                    : isOddRow 
                      ? 'var(--mantine-color-gray-1)' 
                      : 'transparent',
                  '&:hover': {
                    backgroundColor: 'var(--mantine-color-gray-0)',
                  }
                }}
                onClick={() => handleRowClick(ans.model)}
              >
                <Text w={180} size="sm" truncate>{ans.model}</Text>
                <Box 
                  style={{ 
                    flex: 1, 
                    height: '20px', 
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    style={{
                      width: `${barWidth}%`,
                      height: '100%',
                      backgroundColor: isCorrect ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-red-6)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </Box>
                <Text w={35} size="sm" ta="right">{score.toFixed(1)}</Text>
              </Box>
              {isSelected && (
                <Box 
                  mt="xs" 
                  p="md" 
                  style={{ 
                    backgroundColor: 'var(--mantine-color-gray-0)',
                    borderRadius: '4px',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}
                >
                  <Markdown>{ans.answerText}</Markdown>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
      <Group mt="xs" gap="xs" justify="space-between">
        <Text size="xs" c="dimmed">Score represents the quality of the answer (0-5)</Text>
        <Group gap="xs">
          <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Box style={{ width: '12px', height: '12px', backgroundColor: 'var(--mantine-color-green-6)', borderRadius: '2px' }} />
            <Text size="xs" c="dimmed">Correct</Text>
          </Box>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Box style={{ width: '12px', height: '12px', backgroundColor: 'var(--mantine-color-red-6)', borderRadius: '2px' }} />
            <Text size="xs" c="dimmed">Incorrect</Text>
          </Box>
        </Group>
      </Group>
    </Paper>
  );
} 