"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircle, MoreHorizontal } from "lucide-react"
import { CommentForm } from "./comment-form"
import { CommentReactions } from "./comment-reactions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthUser } from "./comment-list"

interface CommentProps {
  id: string
  content: string
  author: AuthUser;
  replyToUser?: AuthUser;
  reactions: {
    like: number
    love: number
    care: number
    happy: number
    wow: number
    sad: number
    angry: number
  }
  replyCount: number
  createdAt: string
  depth: number
  onReply: (commentId: string, content: string) => Promise<void>
  onReact: (commentId: string, type: string) => Promise<void>
  onLoadReplies: (commentId: string) => Promise<void>
}

export function Comment({
  id,
  content,
  author,
  replyToUser,
  reactions,
  replyCount,
  createdAt,
  depth,
  onReply,
  onReact,
  onLoadReplies,
}: CommentProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  const handleReply = async (content: string) => {
    await onReply(id, content)
    setIsReplying(false)
  }

  const handleLoadReplies = async () => {
    await onLoadReplies(id)
    setShowReplies(true)
  }

  return (
    <Card className={`border-0 shadow-none ${depth > 0 ? "ml-8" : ""}`}>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={author.profilePicture || "/placeholder.svg?height=40&width=40"} alt={author.name.first} />
          <AvatarFallback>{author.name.first}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{author.name.first}</span>
            {replyToUser && (
              <>
                <span className="text-muted-foreground">replying to</span>
                <span className="font-medium">{replyToUser.name.first}</span>
              </>
            )}
          </div>
          <span className="text-sm text-muted-foreground">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <CommentReactions reactions={reactions} onReact={(type) => onReact(id, type)} />
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsReplying(!isReplying)}
          >
            <MessageCircle className="w-4 h-4" />
            Reply
          </Button>
        </div>
        {replyCount > 0 && !showReplies && (
          <Button variant="ghost" size="sm" className="text-primary" onClick={handleLoadReplies}>
            Show {replyCount} {replyCount === 1 ? "reply" : "replies"}
          </Button>
        )}
        {isReplying && (
          <div className="w-full">
            <CommentForm onSubmit={handleReply} replyingTo={author.name.first} placeholder={`Reply to ${author.name}...`} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

