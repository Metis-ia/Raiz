import React, { createContext, useContext, useState, useEffect } from "react";

// Define o formato do nosso contexto de tema
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// Cria o contexto com um valor padrão inicial
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Cria o componente Provedor
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Tenta pegar o tema do localStorage, ou usa 'light' como padrão
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const storedTheme = localStorage.getItem('chat-theme');
        return (storedTheme as 'light' | 'dark') || 'light';
    });

    // Efeito que aplica a classe 'dark' ao HTML e salva no localStorage
    useEffect(() => {
        const root = window.document.documentElement;
        
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('chat-theme', theme);
    }, [theme]);

    // Função para alternar o tema
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook customizado para facilitar o uso do contexto nos componentes
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};