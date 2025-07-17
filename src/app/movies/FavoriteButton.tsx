"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useFavorites } from "@/hooks/useFavorites"
import type { Movie } from "@/types"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

export function FavoriteButton({ movie }: { movie: Movie }) {
  const { toast } = useToast()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { t } = useTranslation();
  
  const isFav = isFavorite(movie.imdbID)

  const handleFavoriteToggle = async () => {
    if (isFav) {
      await removeFavorite(movie.imdbID)
      toast({ title: t('removedFromFavorites') })
    } else {
      await addFavorite(movie)
      toast({ title: t('addedToFavorites') })
    }
  }

  return (
    <Button onClick={handleFavoriteToggle} variant="secondary" size="lg">
        <Heart className={cn("mr-2 h-5 w-5", isFav && "fill-red-500 text-red-500")} />
        {isFav ? t('favorited') : t('favorite')}
    </Button>
  )
}
