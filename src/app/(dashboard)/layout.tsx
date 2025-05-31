"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense, memo } from "react";

// Memoize the sidebar and header components to prevent unnecessary re-renders
const MemoizedAppSidebar = memo(AppSidebar);
const MemoizedSiteHeader = memo(SiteHeader);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MemoizedAppSidebar variant="inset" />
      <SidebarInset>
        <MemoizedSiteHeader />
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}