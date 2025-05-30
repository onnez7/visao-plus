// src/components/site-header.tsx
"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const pathname = usePathname()

  // Mapeamento de rotas para títulos
  const pageTitles: { [key: string]: string } = {
    // Mapeamento de rotas para Admin
    "/admin/dashboard": "Dashboard Admin",
    "/admin/franchisees": "Franqueados",
    "/admin/reports": "Relatórios",
    "/admin/settings": "Configurações",
    "/admin/help": "Ajuda",
    "/admin/search": "Pesquisar",

    // Mapeamento de rotas para Fraqueando
    "/franchisee/dashboard": "Dashboard Franqueado",
    "/franchisee/customers": "Clientes",
    "/franchisee/queries": "Consultas",
    "/franchisee/orders": "Pedidos",
    "/franchisee/inventory": "Estoque",
    "/franchisee/finance": "Financeiro",
    "/franchisee/collaborators": "Colaboradores",
    "/franchisee/suppliers": "Fornecedores",
    "/franchisee/reports": "Relatórios",
    "/franchisee/integrations": "Integrações",
    "/franchisee/settings": "Configurações",
    "/franchisee/help": "Ajuda",
    "/franchisee/search": "Pesquisar",

    // Mapeamento de rotas para Colaborador 
    "/collaborator/dashboard": "Dashboard Colaborador",
    "/collaborator/queries": "Consultas",
    "/collaborator/orders": "Pedidos",
    "/collaborator/help": "Ajuda",

    // Mapeamento de rotas para Profissional
    "/professional/dashboard": "Dashboard Profissional",
    "/professional/queries": "Consultas",
    "/professional/customers": "Clientes",
    "/professional/settings": "Configurações",
    "/professional/help": "Ajuda",
   
    // Mapeamento de rotas para Início
    "/": "Início",
  }

  // Define o título com base na rota atual
  const pageTitle = pageTitles[pathname] || "Página Desconhecida"

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  )
}