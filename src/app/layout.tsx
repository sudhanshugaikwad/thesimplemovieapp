import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { Roboto_Slab } from 'next/font/google';
import { FavoritesProvider } from '@/hooks/useFavorites.tsx';
import { Sidebar, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/Header';
import { AuthProvider } from '@/hooks/useAuth.tsx';
import { AuthHandler } from '@/components/AuthHandler';
import { LanguageProvider } from '@/hooks/useTranslation';
import { AppContent } from '@/components/AppContent';

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
          <AuthProvider>
            <FavoritesProvider>
              <LanguageProvider>
                <SidebarProvider>
                  <AppContent>
                     {children}
                  </AppContent>
                </SidebarProvider>
                <Toaster />
              </LanguageProvider>
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
