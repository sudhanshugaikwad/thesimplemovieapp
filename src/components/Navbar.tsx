"use client"

import Link from "next/link"
import { Clapperboard, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">CineFile</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/favorites">
              <Star className="mr-2 h-4 w-4"/>
              Favorites
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
