"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import type { Movie } from "@/types"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/useFavorites"
import { useToast } from "@/hooks/use-toast"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "./ui/skeleton"
import { useTranslation } from "@/hooks/useTranslation"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { toast } = useToast()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { t } = useTranslation();
  
  const isFav = isFavorite(movie.imdbID)

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isFav) {
      await removeFavorite(movie.imdbID)
      toast({ title: t('removedFromFavorites') })
    } else {
      await addFavorite(movie)
      toast({ title: t('addedToFavorites') })
    }
  }

  return (
    <Link href={`/movies/${movie.imdbID}`} className="group block">
      <SpotlightCard className="overflow-hidden transition-all duration-300 ease-in-out border-0 shadow-none bg-transparent h-full flex flex-col p-0">
        <div className="aspect-[2/3] w-full relative">
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450.png"}
            alt={`Poster for ${movie.Title}`}
            fill
            className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="movie poster"
          />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Button 
            size="icon" 
            variant="secondary"
            className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleFavoriteToggle}
            aria-label="Toggle Favorite"
          >
            <Heart className={cn("h-3.5 w-3.5", isFav ? "fill-red-500 text-red-500" : "text-primary")} />
          </Button>
        </div>
        <div className="pt-2 px-1">
          <h3 className="font-semibold text-xs truncate group-hover:text-primary">{movie.Title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
            <span>{movie.Year}</span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  )
}

export function MovieCardSkeleton() {
  return (
    <div className="block">
      <div className="aspect-[2/3] w-full">
          <Skeleton className="w-full h-full rounded-md" />
      </div>
      <div className="pt-2">
        <Skeleton className="h-4 w-3/4 mb-1" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}
