
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { theme } from '@/app/theme';
import { ColorSchemeScript, MantineProvider, Container, Image, Group, Title } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import Header from '@/components/Header';


export const metadata = {
  title: "LLM Reasoning Benchmark",
  description: "LLM Reasoning Benchmark",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript
          nonce="8IBTHwOdqNKAWeKl7plt8g=="
          defaultColorScheme="light"
        />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <ModalsProvider>
            <Header />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
      {/* <GoogleTagManager gtmId="GTM-KSJVTZHT" /> */}
    </html>
  );
}
