"use client"

import Link from "next/link"
import { Clapperboard, LogIn, LogOut, Star } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut(auth)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">CineFile</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {user && (
            <Button variant="ghost" asChild>
              <Link href="/favorites">
                <Star className="mr-2 h-4 w-4"/>
                Favorites
              </Link>
            </Button>
          )}
          <ThemeToggle />
          {loading ? (
             <Button variant="ghost" size="icon" disabled>
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-foreground"></div>
             </Button>
          ) : user ? (
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
