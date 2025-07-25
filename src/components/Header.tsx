"use client"

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger } from './ui/sidebar';
import { handleSearch } from '@/app/actions';
import { usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <SidebarTrigger />
        </div>
        <div className="flex-1">
          <form action={handleSearch} className="relative w-full max-w-md">
             <input type="hidden" name="from" value={pathname} />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="query"
              placeholder={t('searchPlaceholder')}
              className="pl-8 sm:w-64 md:w-80"
            />
          </form>
        </div>
        <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
        </div>
      </div>
    </header>
  );
}
