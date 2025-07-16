"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import type { FavoriteMovie, Movie } from "@/types";

interface FavoritesContextType {
    favorites: FavoriteMovie[];
    loading: boolean;
    addFavorite: (movie: Movie) => Promise<void>;
    removeFavorite: (movieId: string) => Promise<void>;
    isFavorite: (movieId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLocalStorage = (updatedFavorites: FavoriteMovie[]) => {
      try {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      } catch (error) {
          console.error("Failed to save favorites to localStorage", error);
      }
  };

  const addFavorite = useCallback(async (movie: Movie) => {
    setFavorites(prevFavorites => {
        if (prevFavorites.find(fav => fav.movieId === movie.imdbID)) {
            return prevFavorites;
        }
        const newFavorite: FavoriteMovie = {
            movieId: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
            year: movie.Year,
        };
        const updatedFavorites = [...prevFavorites, newFavorite];
        updateLocalStorage(updatedFavorites);
        return updatedFavorites;
    });
  }, []);

  const removeFavorite = useCallback(async (movieId: string) => {
    setFavorites(prevFavorites => {
        const updatedFavorites = prevFavorites.filter(fav => fav.movieId !== movieId);
        updateLocalStorage(updatedFavorites);
        return updatedFavorites;
    });
  }, []);

  const isFavorite = useCallback((movieId: string) => {
    return favorites.some(fav => fav.movieId === movieId);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
