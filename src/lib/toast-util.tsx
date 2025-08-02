// lib/toast-utils.ts
'use client';

import { toast } from 'sonner';

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
  titleColor: '#0f172a', // Slate-900
  descriptionColor: '#334155', // Slate-700
};

const darkThemeStyles = {
  background: '#1e293b',
  titleColor: '#f8fafc', // Light
  descriptionColor: '#cbd5e1', // Slate-300
};

export function useCustomToast() {
  const theme = 'dark'; // Replace with your theme state if dynamic

  return ({ title, description, level = 'success' }: ToastOptions) => {
    const color = borderColors[level];
    const isDark = theme === 'dark';
    const themeStyles = isDark ? darkThemeStyles : lightThemeStyles;

    toast(title, {
      description: description ? (
        <span style={{ color: themeStyles.descriptionColor }}>
          {description}
        </span>
      ) : undefined,
      style: {
        marginTop: '60px',
        borderLeft: `6px solid ${color}`,
        background: themeStyles.background,
        color: themeStyles.titleColor,
      },
    });
  };
}
