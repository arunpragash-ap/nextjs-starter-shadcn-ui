'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmDialogContextType {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export const useConfirmDialog = () => {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx) throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider");
  return ctx.confirm;
};

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({});
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const confirm = (opts: ConfirmDialogOptions) => {
    setOptions(opts);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOpen(false);
    if (resolvePromise) {
      resolvePromise(result);
      setResolvePromise(null);
    }
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      <Dialog open={open} onOpenChange={(v) => !v && handleClose(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{options.title || "Are you sure?"}</DialogTitle>
            {options.description && <DialogDescription>{options.description}</DialogDescription>}
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleClose(false)}>{options.cancelText || "Cancel"}</Button>
            <Button className="bg-red-500" onClick={() => handleClose(true)}>{options.confirmText || "Delete"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
} 