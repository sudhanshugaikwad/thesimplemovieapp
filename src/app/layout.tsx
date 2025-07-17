import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { Roboto_Slab } from 'next/font/google';
import { FavoritesProvider } from '@/hooks/useFavorites.tsx';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { Clapperboard, Home, Tv, Search, Star } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { ActiveLink } from '@/components/ui/active-link';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-slab',
});

export const metadata: Metadata = {
  title: 'CineFile - Your Movie Companion',
  description: 'Discover, search, and save your favorite movies with CineFile.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <FavoritesProvider>
            <SidebarProvider>
              <Sidebar>
                <SidebarHeader>
                  <Link href="/" className="flex items-center gap-2 p-2">
                    <Clapperboard className="h-8 w-8 text-primary" />
                    <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">CineFile</span>
                  </Link>
                </SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <ActiveLink href="/">
                        <SidebarMenuButton tooltip="Home">
                          <Home />
                          <span>Home</span>
                        </SidebarMenuButton>
                    </ActiveLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                     <ActiveLink href="/movies">
                        <SidebarMenuButton tooltip="Movies">
                          <Clapperboard />
                          <span>Movies</span>
                        </SidebarMenuButton>
                    </ActiveLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                     <ActiveLink href="/series">
                        <SidebarMenuButton tooltip="TV Series">
                          <Tv />
                          <span>TV Series</span>
                        </SidebarMenuButton>
                    </ActiveLink>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                     <ActiveLink href="/search">
                        <SidebarMenuButton tooltip="Search">
                          <Search />
                          <span>Search</span>
                        </SidebarMenuButton>
                    </ActiveLink>
                  </SidebarMenuItem>
                </SidebarMenu>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <ActiveLink href="/favorites">
                          <SidebarMenuButton tooltip="Favorites">
                            <Star />
                            <span>Favorites</span>
                          </SidebarMenuButton>
                      </ActiveLink>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <Header />
                <div className="flex-1">{children}</div>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
