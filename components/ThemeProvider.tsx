'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
 theme: Theme;
 toggleTheme: () =>void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
 children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
 const [theme, setTheme] = useState<Theme>('light');
 const [mounted, setMounted] = useState(false);

 // Detect system preference
 const getSystemTheme = (): Theme =>{
 if (typeof window === 'undefined') return 'light';
 return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 };

 // Initialize theme on mount
 useEffect(() =>{
 setMounted(true);

 // Check localStorage first, then system preference
 const savedTheme = localStorage.getItem('theme') as Theme | null;
 const initialTheme = savedTheme || getSystemTheme();

 setTheme(initialTheme);

 // Apply theme class immediately
 if (initialTheme === 'dark') {
 document.documentElement.classList.add('dark');
 } else {
 document.documentElement.classList.remove('dark');
 }
 }, []);

 // Apply theme changes
 useEffect(() =>{
 if (!mounted) return;

 if (theme === 'dark') {
 document.documentElement.classList.add('dark');
 } else {
 document.documentElement.classList.remove('dark');
 }

 // Persist to localStorage
 localStorage.setItem('theme', theme);
 }, [theme, mounted]);

 const toggleTheme = () =>{
 setTheme(prevTheme =>prevTheme === 'light' ? 'dark' : 'light');
 };

 // Always provide context, but theme effects wait for mount
 return (
 <ThemeContext.Provider value={{ theme, toggleTheme }}>
 {children}
 </ThemeContext.Provider>
 );
}

export function useTheme(): ThemeContextType {
 const context = useContext(ThemeContext);

 if (context === undefined) {
 throw new Error('useTheme must be used within a ThemeProvider');
 }

 return context;
}
