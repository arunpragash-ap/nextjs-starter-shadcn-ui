import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  colorTheme: string;
  mode: 'light' | 'dark' | 'system';
}

// Get initial theme from localStorage if available
const getInitialState = (): ThemeState => {
  if (typeof window !== 'undefined') {
    // For SSR compatibility
    try {
      const storedColorTheme = localStorage.getItem('colorTheme') || 'orange-theme';
      const storedMode = localStorage.getItem('themeMode') as ThemeState['mode'] || 'dark';
      return {
        colorTheme: storedColorTheme,
        mode: storedMode,
      };
    } catch (e) {
      // Fallback if localStorage is not available
      return {
        colorTheme: 'orange-theme',
        mode: 'dark',
      };
    }
  }

  // Default for SSR
  return {
    colorTheme: 'orange-theme',
    mode: 'dark',
  };
};

const initialState: ThemeState = getInitialState();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setColorTheme(state, action: PayloadAction<string>) {
      state.colorTheme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('colorTheme', action.payload);
      }
    },
    setThemeMode(state, action: PayloadAction<'light' | 'dark' | 'system'>) {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', action.payload);
      }
    },
  },
});

export const { setColorTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
