"use client"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { useEffect, useState } from "react";

export default function Account(): JSX.Element {
    const breadcrumbItems = [
        {label:'Personal Data', path:'/account/personaldata', icon:Home},
        {label:'Payment', path:'/account/payment', icon:Calendar},
        {label:'Orders', path:'/account/orders', icon: Inbox},
        {label:'Wish list', path:'/account/wishlist', icon: Search},
        {label:'Notification', path:'/account/notification', icon: Settings},
        {label:'Contact Us', path:'/account/contactus', icon: Calendar},
        {label:'Log Out', path:'/account/logout', icon: Calendar},
    ]

    return (
        <div></div>
    )
}

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]