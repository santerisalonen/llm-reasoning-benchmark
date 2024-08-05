"use client";

import {useState, useEffect} from 'react';
import {useMantineColorScheme, Container, Center, Box, Title, Text, Group, Button, Image, Card, Badge, Divider, Skeleton, Loader} from '@mantine/core';
import Link from 'next/link';


export default function Home() {

  return (
    <Container size="xs">

      <Text ff="monospace">
        Welcome to the LLM Reasoning Benchmark, a cutting-edge initiative designed to assess and compare the cognitive capabilities of large language models (LLMs) in complex reasoning tasks. As artificial intelligence continues to advance at an unprecedented pace, the need for robust, standardized evaluation methods becomes increasingly crucial. Our benchmark aims to fill this gap by providing a comprehensive framework for measuring LLM performance across various dimensions of reasoning.
      </Text>
     
      <Divider my="xl" />

    </Container>
  );
}
