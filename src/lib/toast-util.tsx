// lib/toast-utils.ts
'use client';

import { toast } from 'sonner';
import { useTheme } from 'next-themes';

type ToastLevel = 'success' | 'error' | 'warning';

interface ToastOptions {
  title: string;
  description?: string;
  level?: ToastLevel;
}

const borderColors: Record<ToastLevel, string> = {
  success: '#22c55e', // Green
  error: '#ef4444',   // Red
  warning: '#f97316', // Orange
};

const lightThemeStyles = {
  background: '#ffffff',
  color: '#0f172a', // Slate-900
};

const darkThemeStyles = {
  background: '#1e293b',
  color: '#f8fafc',
};

export function useCustomToast() {
  const { theme } = useTheme();

  return ({ title, description, level = 'success' }: ToastOptions) => {
    const color = borderColors[level];

    const isDark = theme === 'dark';

    const themeStyles = isDark ? darkThemeStyles : lightThemeStyles;

    toast(title, {
      description,
      style: {
        marginTop: '60px',
        borderLeft: `6px solid ${color}`,
        background: themeStyles.background,
        color: themeStyles.color,
      },
    });
  };
}
