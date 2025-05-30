import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Esses são dados de exemplo.
const data = {
  navMain: [
    {
      title: "Primeiros Passos",
      url: "#",
      items: [
        {
          title: "Instalação",
          url: "#",
        },
        {
          title: "Estrutura do Projeto",
          url: "#",
        },
      ],
    },
    {
      title: "Construindo sua Aplicação",
      url: "#",
      items: [
        {
          title: "Roteamento",
          url: "#",
        },
        {
          title: "Busca de Dados",
          url: "#",
          isActive: true,
        },
        {
          title: "Renderização",
          url: "#",
        },
        {
          title: "Cache",
          url: "#",
        },
        {
          title: "Estilização",
          url: "#",
        },
        {
          title: "Otimização",
          url: "#",
        },
        {
          title: "Configuração",
          url: "#",
        },
        {
          title: "Testes",
          url: "#",
        },
        {
          title: "Autenticação",
          url: "#",
        },
        {
          title: "Deploy",
          url: "#",
        },
        {
          title: "Atualização",
          url: "#",
        },
        {
          title: "Exemplos",
          url: "#",
        },
      ],
    },
    {
      title: "Referência de API",
      url: "#",
      items: [
        {
          title: "Componentes",
          url: "#",
        },
        {
          title: "Convenções de Arquivos",
          url: "#",
        },
        {
          title: "Funções",
          url: "#",
        },
        {
          title: "Opções do next.config.js",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Arquitetura",
      url: "#",
      items: [
        {
          title: "Acessibilidade",
          url: "#",
        },
        {
          title: "Atualização Rápida (Fast Refresh)",
          url: "#",
        },
        {
          title: "Compilador do Next.js",
          url: "#",
        },
        {
          title: "Navegadores Suportados",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "Comunidade",
      url: "#",
      items: [
        {
          title: "Guia de Contribuição",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentação</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
