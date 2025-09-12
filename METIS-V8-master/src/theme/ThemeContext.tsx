// src/theme/ThemeContext.tsx

import React, { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Define os temas claro e escuro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976D2' },
    background: { default: '#F4F6F8', paper: '#FFFFFF' },
    action: { hover: '#E3F2FD' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90CAF9' },
    background: { default: '#121212', paper: '#1E1E1E' },
    action: { hover: '#333333' }
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'unset' } } },
    MuiAvatar: { styleOverrides: { root: { bgcolor: '#3A3A3A' } } }
  }
});

// Cria o Contexto
interface ThemeContextType {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: 'light',
});

// Hook para usar o contexto
export const useThemeToggle = () => useContext(ThemeContext);

// Componente Provedor do Tema
export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const themeToggle = useMemo(() => ({
    toggleTheme: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    mode,
  }), [mode]);

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={themeToggle}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};