"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  BuildingIcon,
  InboxIcon,
  CreditCardIcon,
  BarChartIcon,
  Settings2Icon,
  MoonIcon,
  HomeIcon,
  CommandIcon,
  ShieldAlertIcon,
  UsersIcon,
  StarIcon
} from "lucide-react"
import Link from "next/link"

export interface SidebarUser {
  name: string
  email: string
  avatar: string
}

const baseData = {
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Theme",
      url: "#",
      icon: <MoonIcon />,
    },
    {
      title: "Home Page",
      url: "/",
      icon: <HomeIcon />,
    },
  ],
}

const landlordNav = [
  {
    title: "Dashboard Overview",
    url: "/dashboard/landlord",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "My Properties",
    url: "/dashboard/landlord/properties",
    icon: <BuildingIcon />,
  },
  {
    title: "Requests & Bookings",
    url: "/dashboard/landlord/requests",
    icon: <InboxIcon />,
  },
  {
    title: "Payment History",
    url: "/dashboard/landlord/payments",
    icon: <CreditCardIcon />,
  },
  {
    title: "Reporting",
    url: "/dashboard/landlord/reporting",
    icon: <BarChartIcon />,
  },
]

const tenantNav = [
  {
    title: "Dashboard Overview",
    url: "/dashboard/tenant",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Rental Requests",
    url: "/dashboard/tenant/requests",
    icon: <InboxIcon />,
  },
  {
    title: "Payment History",
    url: "/dashboard/tenant/payments",
    icon: <CreditCardIcon />,
  },
  {
    title: "My Reviews",
    url: "/dashboard/tenant/reviews",
    icon: <StarIcon />,
  },
]

const adminNav = [
  {
    title: "Overview",
    url: "/dashboard/admin",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Users Management",
    url: "/dashboard/admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "Content Moderation",
    url: "/dashboard/admin/moderation",
    icon: <ShieldAlertIcon />,
  },
]

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: SidebarUser }) {
  const pathname = usePathname()

  let currentNav = landlordNav 
  if (pathname.includes("/dashboard/tenant")) {
    currentNav = tenantNav
  } else if (pathname.includes("/dashboard/admin")) {
    currentNav = adminNav
  }

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-background">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CommandIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">OpenNest</span>
                <span className="truncate text-xs">Rental Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={currentNav} />
        <NavSecondary items={baseData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
