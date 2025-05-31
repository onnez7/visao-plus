"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Suspense, memo, useCallback } from "react";
import { usePathname } from "next/navigation";

// Memoize the sidebar and header components
const MemoizedAppSidebar = memo(AppSidebar);
const MemoizedSiteHeader = memo(SiteHeader);

// Memoize the main content wrapper
const ContentWrapper = memo(function ContentWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Memoize the key to force content preservation between navigations
  const contentKey = useCallback(() => {
    // Extract the main route segment to use as cache key
    return pathname.split('/')[1] || 'root';
  }, [pathname]);

  return (
    <SidebarProvider>
      <MemoizedAppSidebar variant="inset" />
      <SidebarInset>
        <MemoizedSiteHeader />
        <ContentWrapper key={contentKey()}>
          {children}
        </ContentWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
}