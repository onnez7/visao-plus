// app/integrations/page.tsx
"use client";

import { useState } from 'react';
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { apps } from './apps'; // Import apps data

const appText = new Map<string, string>([
  ['all', 'Todos os aplicativos'],
  ['connected', 'Conectado'],
  ['notConnected', 'Não conectado'],
]);

export default function IntegrationsPage() {
  const [sort, setSort] = useState('ascending');
  const [appType, setAppType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) =>
      appType === 'connected'
        ? app.connected
        : appType === 'notConnected'
          ? !app.connected
          : true
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">
                  Integrações de aplicativos
                </h1>
                <p className="text-muted-foreground">
                  Aqui está uma lista de seus aplicativos para integração!
                </p>
                <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
                  <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
                    <Input
                      placeholder="Filtrar aplicativos..."
                      className="h-9 w-40 lg:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select value={appType} onValueChange={setAppType}>
                      <SelectTrigger className="w-36">
                        <SelectValue>{appText.get(appType)}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os aplicativos</SelectItem>
                        <SelectItem value="connected">Conectado</SelectItem>
                        <SelectItem value="notConnected">Não conectado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-16">
                      <SelectValue>
                        <IconAdjustmentsHorizontal size={18} />
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="ascending">
                        <div className="flex items-center gap-4">
                          <IconSortAscendingLetters size={16} />
                          <span>Ascendente</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="descending">
                        <div className="flex items-center gap-4">
                          <IconSortDescendingLetters size={16} />
                          <span>Descendente</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator className="shadow-sm" />
                <ul className="grid gap-4 pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
                  {filteredApps.map((app) => (
                    <li
                      key={app.name}
                      className="rounded-lg border p-4 hover:shadow-md"
                    >
                      <div className="mb-8 flex items-center justify-between">
                        <div
                          className="bg-muted flex size-10 items-center justify-center rounded-lg p-2"
                        >
                          {app.logo}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className={
                            app.connected
                              ? 'border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900'
                              : ''
                          }
                        >
                          {app.connected ? 'Conectado' : 'Conectar'}
                        </Button>
                      </div>
                      <div>
                        <h2 className="mb-1 font-semibold">{app.name}</h2>
                        <p className="line-clamp-2 text-gray-500">{app.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}