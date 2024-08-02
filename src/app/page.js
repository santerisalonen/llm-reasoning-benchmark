"use client";

import {useState, useEffect} from 'react';
import {useMantineColorScheme, Container, Center, Box, Title, Text, Group, Button, Image, Card, Badge, Divider, Skeleton, Loader} from '@mantine/core';
import Link from 'next/link';


export default function Home() {

  const { setColorScheme, clearColorScheme } = useMantineColorScheme();


  return (
    <Container size="xs">


      <Text>Some text</Text>


      <Text ff="monospace">
        This text uses --mantine-font-family-monospace variable
      </Text>
     
      <Divider my="xl" />

      <Group>
        <Button size="compact-xs" color="dark.5" onClick={() => setColorScheme('light')}>Light mode</Button>
        <Button size="compact-xs" color="dark.5" onClick={() => setColorScheme('dark')}>Dark mode</Button>
        <Button size="compact-xs" color="dark.5" onClick={() => clearColorScheme()}>Reset color scheme</Button>
      </Group>

    </Container>
  );
}
