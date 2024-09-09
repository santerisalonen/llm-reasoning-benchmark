import React from 'react';
import { Badge, SimpleGrid, Flex, Box, Text, Progress, Stack, Table, Group } from '@mantine/core';

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

const LeaderBoard = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            Rank
          </Table.Th>
          <Table.Th>
            Model
          </Table.Th>
          <Table.Th>
            Score
          </Table.Th>
        </Table.Tr>

      </Table.Thead>
      <Table.Tbody>
        {sortedData.map((row, index) => {
          return (
            <Table.Tr key={row.model}>
              <Table.Td>
                <Badge color={getRankColor(index + 1)} size={index < 3 ? 'lg' : 'md'} >
                  {index + 1}
                </Badge>
                
              </Table.Td>
              <Table.Td>
                {row.name}
              </Table.Td>
              <Table.Td>
                <Group>
                  <Progress w="50%" value={row.score * 20} />   
                  <Text size="xs">{row.score} / 5</Text>  
                </Group>

              </Table.Td>   
            </Table.Tr>
          )
    

        })}
      </Table.Tbody>
    </Table>

  )

  {/*
  return (
    <Stack>
      {sortedData.map((item, index) => (
        <LeaderboardItem
          key={item.name}
          rank={index + 1}
          {...item}
        />
      ))}
    </Stack>
  );
  */}
};

export default LeaderBoard;