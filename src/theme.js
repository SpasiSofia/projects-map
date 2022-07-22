import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  fonts: {
    heading: `'Sofia Sans Bold', sans-serif`,
    body: `'Sofia Sans', sans-serif`,
  },
  colors: {
    brand: {
      100: '#F4EDFC',
      200: '#4A2F62',
      300: '#4A2F62',
      400: '#4A2F62',
      500: '#4A2F62',
      600: '#4A2F62',
      700: '#4A2F62',
      800: '#4A2F62',
      900: '#1a202c',
    },
    ssyellow: {
      50: '#fef8e8',
      100: '#fbe8b7',
      200: '#f9dd95',
      300: '#f6cd64',
      400: '#f5c446',
      500: '#f2b518',
      600: '#dca516',
      700: '#ac8111',
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          borderRadius: '0',
        },
      },
    },
  },
});
