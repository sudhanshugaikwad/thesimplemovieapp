"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useFavorites } from "@/hooks/useFavorites"
import type { Movie } from "@/types"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export function FavoriteButton({ movie }: { movie: Movie }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  
  const isFav = isFavorite(movie.imdbID)

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add movies to your favorites.",
        variant: "destructive"
      })
      router.push('/login')
      return
    }

    if (isFav) {
      await removeFavorite(movie.imdbID)
      toast({ title: "Removed from favorites." })
    } else {
      await addFavorite(movie)
      toast({ title: "Added to favorites." })
    }
  }

  return (
    <Button onClick={handleFavoriteToggle} variant="outline" size="lg">
        <Heart className={cn("mr-2 h-5 w-5", isFav && "fill-red-500 text-red-500")} />
        {isFav ? "Favorited" : "Add to Favorites"}
    </Button>
  )
}
