import { Star } from "lucide-react"

interface CardRatingProps {
  rating: number
  reviewCount: number
}

export function CardRating({ rating, reviewCount }: CardRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-primary text-primary" />
      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)} • {reviewCount} Reviews
      </span>
    </div>
  )
}

