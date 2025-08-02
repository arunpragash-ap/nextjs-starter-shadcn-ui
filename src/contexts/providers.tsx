// providers.tsx
"use client";
import { Toaster } from "sonner";
import { ConfirmDialogProvider } from "@/components/ui/ConfirmDialog";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthGuard from "@/lib/auth-guard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* <ColorThemeProvider> */}
        <ConfirmDialogProvider>
          <AuthGuard>
            {children}
            <Toaster position="top-right"/>
          </AuthGuard>
        </ConfirmDialogProvider>
      {/* </ColorThemeProvider> */}
    </Provider>
  );
}
