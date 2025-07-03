import { ColorThemeProvider } from '@/contexts/theme-context/color-theme-provider'
import { ThemeProvider } from './theme-context/theme-provider';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorThemeProvider>

<ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

      {children}
      <Toaster 
          position="top-right"
          richColors
          expand={false}
          visibleToasts={5}
        />
          </ThemeProvider>
    </ColorThemeProvider>
  );
}
