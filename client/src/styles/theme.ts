import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    basic: {
      main: '#B9A081',
    },
  },
  typography: {
    fontSize: 30,
    allVariants: {
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'].join(' , '),
      textTransform: 'none',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    basic: Palette['primary'];
  }

  interface PaletteOptions {
    basic?: PaletteOptions['primary'];
  }
}
