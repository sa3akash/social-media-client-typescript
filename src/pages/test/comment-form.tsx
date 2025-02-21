import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  replyingTo?: string
  placeholder?: string
  initialContent?: string
  userImage?: string
  userName?: string
}

export function CommentForm({
  onSubmit,
  replyingTo,
  placeholder = "Write a comment...",
  initialContent = "",
  userImage = "/placeholder.svg?height=40&width=40",
  userName = "User",
}: CommentFormProps) {
  const [content, setContent] = useState(initialContent)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content)
      setContent("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-start p-4">
      <Avatar className="w-10 h-10">
        <AvatarImage src={userImage} alt={userName} />
        <AvatarFallback>{userName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={replyingTo ? `Reply to ${replyingTo}...` : placeholder}
          className="min-h-[100px] mb-2"
        />
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </form>
  )
}

