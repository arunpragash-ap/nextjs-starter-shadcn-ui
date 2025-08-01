"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BreadcrumbsProps } from "@/types/app-header";

export const Breadcrumbs = ({ segments, allCrumbs }: BreadcrumbsProps) => {
  const router = useRouter();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Back Arrow Button */}
        {segments.length > 0 && (
          <BreadcrumbItem>
            <Button
              variant="secondary"
              size="icon"
              className="mr-2"
              aria-label="Go back"
              onClick={() => router.back()}
            >
              <span className="text-muted-foreground">←</span>
            </Button>
          </BreadcrumbItem>
        )}
        {/* Dynamic Breadcrumbs */}
        {allCrumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.href || idx}>
            <BreadcrumbItem>
              {crumb.isLast || idx === allCrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {idx < allCrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};