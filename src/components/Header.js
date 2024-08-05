"use client";

import {SunMoon} from 'lucide-react';
import {useMantineColorScheme, Container, Group, Image, Title} from '@mantine/core';


export default () => {
  const { colorScheme, setColorScheme, clearColorScheme, toggleColorScheme } = useMantineColorScheme();


  return (
    <>
      <div style={{
        position:"fixed",
        top: "10px",
        right: "10px"
      }}>
        <SunMoon onClick={() => { 
          toggleColorScheme(); 
        }} />
      </div>

      <Container size="xs" my="md">
        <Group>
          <Image w={60} src="./llm-reasoning-logo.png" />
          <Title order={1}>LLM Reasoning Benchmark</Title>
        </Group>
      </Container>
    </>
  ) 
}