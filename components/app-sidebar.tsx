"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconTargetArrow,
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconMail,
  IconChartPie,
  IconTrendingUp,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Marketing Manager",
    email: "manager@agency.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Campaign Manager",
      url: "#",
      icon: IconTargetArrow,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconTrendingUp,
    },
    {
      title: "Clients",
      url: "#",
      icon: IconUsers,
    },
  ],
  navChannels: [
    {
      name: "Google Ads",
      url: "#",
      icon: IconBrandGoogle,
    },
    {
      name: "Facebook Ads",
      url: "#",
      icon: IconBrandFacebook,
    },
    {
      name: "LinkedIn Ads",
      url: "#",
      icon: IconBrandLinkedin,
    },
    {
      name: "Email Marketing",
      url: "#",
      icon: IconMail,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Help & Support",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Performance Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Client Reports",
      url: "#",
      icon: IconFileDescription,
    },
    {
      name: "Campaign Templates",
      url: "#",
      icon: IconFolder,
    },
    {
      name: "Audience Data",
      url: "#",
      icon: IconDatabase,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconChartPie className="!size-5" />
                <span className="text-base font-semibold">ADmyBRAND</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navChannels} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
