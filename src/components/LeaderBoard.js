import React, { useState } from 'react';
import { Badge, SimpleGrid, Flex, Box, Text, Progress, Stack, Table, Group, Anchor } from '@mantine/core';

const getRankColor = (rank) => {
  switch (rank) {
    case 1: return '#FFD700'; // Gold
    case 2: return 'gray.5'; // Silver
    case 3: return '#CD7F32'; // Bronze
    default: return 'gray.5'; // Gray for others
  }
};
const getRankBg = (rank) => {
  switch (rank) {
    case 1: return 'gray.3'; // Gold
    case 2: return 'gray.2'; // Silver
    case 3: return 'gray.2'; // Bronze
    default: return 'gray.1'; // Gray for others
  }
};

const LeaderboardItem = ({ rank, name, description, score }) => (

    <Flex justify="space-between" align="center" bg={getRankBg(rank)} p={3} m={2} >
      <Text fw={700}>{name}</Text>
      <Box w="50%">
        <Badge w={score * 50} size="xl" color={getRankColor(rank)}>
          {`${score} / 5`}
        </Badge>
      </Box>
    </Flex>

);

const LeaderBoard = ({ data, showReasoningModels = false, maxResults }) => {
  const [showAll, setShowAll] = useState(false);
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  
  const displayData = showAll || !maxResults ? sortedData : sortedData.slice(0, maxResults);
  const hasMoreResults = maxResults && sortedData.length > maxResults;

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={80}>Rank</Table.Th>
            <Table.Th>Model</Table.Th>
            <Table.Th w="40%">Score</Table.Th>
            <Table.Th w={100}>Avg. Words</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {displayData.map((row, index) => (
            <Table.Tr key={row.name + index}>
              <Table.Td>
                <Badge color={getRankColor(index + 1)} size={index < 3 ? 'lg' : 'md'}>
                  {index + 1}
                </Badge>
              </Table.Td>
              <Table.Td>
                {row.name}
                {showReasoningModels && row.reasoningModel && '*'}
              </Table.Td>
              <Table.Td>
                <Group>
                  <Progress w="70%" value={row.score * 20} />   
                  <Text size="xs">{row.score} / 5</Text>  
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm" c="dimmed">{row.avgWords}</Text>
              </Table.Td>   
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      
      {hasMoreResults && !showAll && (
        <Text mt="xs" size="sm">
          <Anchor onClick={() => setShowAll(true)} style={{ cursor: 'pointer' }}>
            Show all {sortedData.length} results
          </Anchor>
        </Text>
      )}
      
      {showReasoningModels && (
        <Text size="xs" c="dimmed" mt="xs">
          * Model uses chain-of-thought reasoning by default
        </Text>
      )}
    </>
  );
};

export default LeaderBoard;