import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ThumbsUp, Smile, PartyPopper, Flame, Frown, Angry } from "lucide-react"

interface Reactions {
  like: number
  love: number
  care: number
  happy: number
  wow: number
  sad: number
  angry: number
}

interface CommentReactionsProps {
  reactions: Reactions
  onReact: (type: keyof Reactions) => Promise<void>
}

const reactionIcons = {
  like: ThumbsUp,
  love: Heart,
  care: Smile,
  happy: PartyPopper,
  wow: Flame,
  sad: Frown,
  angry: Angry,
}

export function CommentReactions({ reactions, onReact }: CommentReactionsProps) {
  const [activeReaction, setActiveReaction] = useState<keyof Reactions | null>(null)
  const [isReacting, setIsReacting] = useState(false)

  const handleReaction = async (type: keyof Reactions) => {
    if (isReacting) return
    setIsReacting(true)
    try {
      await onReact(type)
      setActiveReaction(type)
    } finally {
      setIsReacting(false)
    }
  }

  return (
    <div className="flex gap-2 items-center">
      {Object.entries(reactionIcons).map(([type, Icon]) => (
        <Button
          key={type}
          variant="ghost"
          size="sm"
          className={`flex items-center gap-1 ${activeReaction === type ? "text-primary" : "text-muted-foreground"}`}
          onClick={() => handleReaction(type as keyof Reactions)}
          disabled={isReacting}
        >
          <Icon className="w-4 h-4" />
          <span className="text-xs">{reactions[type as keyof Reactions]}</span>
        </Button>
      ))}
    </div>
  )
}

