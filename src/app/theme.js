
import { createTheme, rem } from '@mantine/core';
import {Roboto, Lato, Pacifico, Pixelify_Sans, Architects_Daughter, Reenie_Beanie, Short_Stack, Lora, Source_Code_Pro} from 'next/font/google'

const heading = Lora({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
const body = Lato({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const monospace = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const handWritten = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  display: "swap"
})


export const theme = createTheme({
  colors: {
    blue: [
      "#eff0fa",
      "#dbdcef",
      "#b4b7e2",
      "#8a8fd5",
      "#666dc9",
      "#5157c3",
      "#464cc0",
      "#373eab",
      "#303799",
      "#272f87"
    ],
    green: [
      "#e6fff2",
      "#d0ffe6",
      "#9ffecc",
      "#6cfdb0",
      "#45fd99",
      "#31fd8a",
      "#24fd81",
      "#17e26f",
      "#01c960",
      "#00ae50"
    ],
  },
  fontFamily: body.style.fontFamily,
  fontFamilyMonospace: monospace.style.fontFamily,
  headings: { 
    fontFamily: heading.style.fontFamily,
  },
  other: {
    handWrittenFontFamily: handWritten.style.fontFamily
  }
});

