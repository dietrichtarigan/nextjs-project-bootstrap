"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { addToFavorites, removeFromFavorites } from "@/lib/api"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface FavoriteButtonProps {
  itemId: string
  type: "article" | "opportunity"
  initialIsFavorited?: boolean
  className?: string
}

export function FavoriteButton({
  itemId,
  type,
  initialIsFavorited = false,
  className = ""
}: FavoriteButtonProps) {
  const { user } = useAuth()
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save items to your favorites")
      return
    }

    setIsLoading(true)
    try {
      if (isFavorited) {
        await removeFromFavorites(itemId)
        toast.success("Removed from favorites")
      } else {
        await addToFavorites(itemId, type)
        toast.success("Added to favorites")
      }
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error("Favorite toggle error:", error)
      toast.error("Failed to update favorites. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`group ${className}`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <i
        className={`${
          isFavorited ? "fas" : "far"
        } fa-heart mr-2 text-red-500 group-hover:scale-110 transition-transform`}
      ></i>
      {isFavorited ? "Saved" : "Save"}
    </Button>
  )
}

// Compact version without text, just the icon
export function FavoriteIconButton({
  itemId,
  type,
  initialIsFavorited = false,
  className = ""
}: FavoriteButtonProps) {
  const { user } = useAuth()
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to save items to your favorites")
      return
    }

    setIsLoading(true)
    try {
      if (isFavorited) {
        await removeFromFavorites(itemId)
        toast.success("Removed from favorites")
      } else {
        await addToFavorites(itemId, type)
        toast.success("Added to favorites")
      }
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error("Favorite toggle error:", error)
      toast.error("Failed to update favorites. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`group p-2 hover:bg-transparent ${className}`}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <i
        className={`${
          isFavorited ? "fas" : "far"
        } fa-heart text-red-500 group-hover:scale-110 transition-transform`}
      ></i>
    </Button>
  )
}
