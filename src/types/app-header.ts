import { BreadcrumbItem } from "@/config/breadcrumb-config";


export type AppHeaderProps = Record<string, never>;

export interface BreadcrumbsProps {
  segments: string[];
  allCrumbs: BreadcrumbItem[];
}

export interface DesktopControlsProps {
  pathname: string;
}

export interface MobileControlsProps {
  pathname: string;
}