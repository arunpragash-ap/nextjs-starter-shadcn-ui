"use client";
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

interface ResponsiveDialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  drawerHeaderClassName?: string;
  dialogContentClassName?: string;
}

export function ResponsiveDialogDrawer({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  drawerHeaderClassName = "text-left",
  dialogContentClassName = "sm:max-w-[425px]",
}: ResponsiveDialogDrawerProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className={drawerHeaderClassName}>
            <DrawerTitle className="whitespace-normal break-words">{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="px-4 space-y-2">{children}</div>
          {footer && <DrawerFooter className="pt-2">{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={dialogContentClassName + " [&>button]:hidden"}>
        <DialogHeader>
          <DialogTitle className="whitespace-normal break-words">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-2">{children}</div>
        {footer && <DialogFooter className="pt-2">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
} 