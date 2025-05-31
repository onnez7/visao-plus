// src/components/app-sidebar.tsx
"use client"

import React, { useMemo, useEffect, useState, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  ChartNoAxesCombined,
  Component,
  Factory,
  FileChartColumn,
  HelpCircleIcon,
  LayoutDashboardIcon,
  LayoutList,
  Package,
  SearchIcon,
  SettingsIcon,
  UserRound,
  UsersIcon,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"

// Memoize the navigation items configuration
const useNavItems = (userRole: string | null) => {
  return useMemo(() => {
    const navConfigs: { [key: string]: { navMain: any[], navSecondary: any[] } } = {
      admin: {
        navMain: [
          { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboardIcon },
          { title: "Franqueados", url: "/admin/franchisees", icon: UsersIcon },
          { title: "Relatórios", url: "/admin/reports", icon: FileChartColumn },
          { title: "Configurações", url: "/admin/settings", icon: SettingsIcon },
        ],
        navSecondary: [
          { title: "Configurações", url: "/admin/settings", icon: SettingsIcon },
          { title: "Ajuda", url: "/help", icon: HelpCircleIcon },
          { title: "Pesquisar", url: "/admin/search", icon: SearchIcon },
        ],
      },
      franchisee: {
        navMain: [
          { title: "Dashboard", url: "/franchisee/dashboard", icon: LayoutDashboardIcon },
          { title: "Clientes", url: "/franchisee/customers", icon: UserRound },
          { title: "Consultas", url: "/franchisee/queries", icon: Calendar },
          { title: "Pedidos", url: "/franchisee/orders", icon: LayoutList },
          { title: "Estoque", url: "/franchisee/inventory", icon: Package },
          { title: "Financeiro", url: "/franchisee/finance", icon: ChartNoAxesCombined },
          { title: "Colaboradores", url: "/franchisee/collaborators", icon: UsersIcon },
          { title: "Fornecedores", url: "/franchisee/suppliers", icon: Factory },
          { title: "Relatórios", url: "/franchisee/reports", icon: FileChartColumn },
          { title: "Integrações", url: "/franchisee/integrations", icon: Component },
        ],
        navSecondary: [
          { title: "Configurações", url: "/franchisee/settings", icon: SettingsIcon },
          { title: "Ajuda", url: "/help", icon: HelpCircleIcon },
          { title: "Pesquisar", url: "/franchisee/search", icon: SearchIcon },
        ],
      },
      collaborator: {
        navMain: [
          { title: "Dashboard", url: "/collaborator/dashboard", icon: LayoutDashboardIcon },
          { title: "Consultas", url: "/collaborator/queries", icon: Calendar },
          { title: "Pedidos", url: "/collaborator/orders", icon: LayoutList },
        ],
        navSecondary: [
          { title: "Configurações", url: "/collaborator/settings", icon: SettingsIcon },
          { title: "Ajuda", url: "/help", icon: HelpCircleIcon },
          { title: "Pesquisar", url: "/collaborator/search", icon: SearchIcon },
        ],
      },
      professional: {
        navMain: [
          { title: "Dashboard", url: "/professional/dashboard", icon: LayoutDashboardIcon },
          { title: "Consultas", url: "/professional/queries", icon: Calendar },
          { title: "Clientes", url: "/professional/customers", icon: UserRound },
          { title: "Integrações", url: "/professional/integrations", icon: Component },
        ],
        navSecondary: [
          { title: "Configurações", url: "/professional/settings", icon: SettingsIcon },
          { title: "Ajuda", url: "/professional/help", icon: HelpCircleIcon },
          { title: "Pesquisar", url: "/professional/search", icon: SearchIcon },
        ],
      },
    }

    return userRole ? navConfigs[userRole] : { navMain: [], navSecondary: [] }
  }, [userRole])
}

// Memoize the user data component
const MemoizedNavUser = memo(NavUser);

export const AppSidebar = memo(function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [userData, setUserData] = useState<{ name: string; email: string; avatar: string }>({
    name: "Usuário",
    email: "email@example.com",
    avatar: "/avatars/default.jpg",
  })

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role, name, email')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Erro ao buscar papel do usuário:', error)
          return
        }

        setUserRole(data.role)
        setUserData({
          name: data.name || "Usuário",
          email: data.email || "email@example.com",
          avatar: "/avatars/default.jpg",
        })
      }
    }

    fetchUserRole()
  }, [])

  const navItems = useNavItems(userRole)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={userRole ? `/${userRole}` : "/"}>
                <span className="text-xl font-semibold">Visão +</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems.navMain} />
        <NavSecondary items={navItems.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <MemoizedNavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
})