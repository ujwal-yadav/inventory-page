import { createTheme, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';

export const renderWithTheme = (ui, { themeOptions = {} } = {}) => {
  const theme = createTheme(themeOptions);
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};
