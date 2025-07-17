"use client"

import Link from "next/link";
import { Clapperboard, Home, Tv, Search, Star } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/Header";
import { AuthHandler } from "@/components/AuthHandler";
import { ActiveLink } from "@/components/ui/active-link";
import { useTranslation } from "@/hooks/useTranslation";

export function AppContent({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <Link href="/" className="flex items-center gap-2 p-2">
                        <Clapperboard className="h-8 w-8 text-primary" />
                        <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">{t('cinefile')}</span>
                    </Link>
                </SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ActiveLink href="/">
                            <SidebarMenuButton tooltip={t('home')}>
                                <Home />
                                <span>{t('home')}</span>
                            </SidebarMenuButton>
                        </ActiveLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <ActiveLink href="/movies">
                            <SidebarMenuButton tooltip={t('movies')}>
                                <Clapperboard />
                                <span>{t('movies')}</span>
                            </SidebarMenuButton>
                        </ActiveLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <ActiveLink href="/series">
                            <SidebarMenuButton tooltip={t('tvSeries')}>
                                <Tv />
                                <span>{t('tvSeries')}</span>
                            </SidebarMenuButton>
                        </ActiveLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <ActiveLink href="/search">
                            <SidebarMenuButton tooltip={t('search')}>
                                <Search />
                                <span>{t('search')}</span>
                            </SidebarMenuButton>
                        </ActiveLink>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <ActiveLink href="/favorites">
                                <SidebarMenuButton tooltip={t('favorites')}>
                                    <Star />
                                    <span>{t('favorites')}</span>
                                </SidebarMenuButton>
                            </ActiveLink>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <Header />
                <main className="flex-1">
                    <AuthHandler />
                    {children}
                </main>
            </SidebarInset>
        </>
    )
}
