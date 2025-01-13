import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  primaryShade: { light: 6, dark: 8 },
  colors: {
    greenTheme: [
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A',
      '#4CAF50',
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20',
    ],
  },
  primaryColor: 'greenTheme',
  fontFamily: 'Arial, sans-serif',
  fontSizes: { xs: '12px', sm: '14px', md: '16px', lg: '20px', xl: '24px' },
  radius: { sm: '4px', md: '8px', lg: '12px' },
  spacing: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
  components: {
    Button: {
      styles: (theme:any) => ({
        root: {
          backgroundColor: theme.colors.greenTheme[5],
          color: theme.white,
          '&:hover': {
            backgroundColor: theme.colors.greenTheme[6],
          },
        },
      }),
    },
    Card: {
      styles: (theme:any) => ({
        root: {
          borderColor: theme.colors.greenTheme[4],
          borderWidth: 2,
          borderStyle: 'solid',
        },
      }),
    },
  },
});
