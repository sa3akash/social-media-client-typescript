

import { useEffect, useState } from "react"
import { Comment } from "./comment"
import { CommentForm } from "./comment-form"
import { Button } from "@/components/ui/button"

export interface AuthUser {
    avatarColor: string;
      coverPicture: string;
      createdAt: string;
      email: string;
      name: { first: string; last: string; nick: string };
      profilePicture: string;
      quote: string;
      uId: string;
      username: string;
      _id: string;
}

export interface RealDataMessage {
    author: AuthUser;
    replyToUser?: AuthUser;
    content: string;
    createdAt: string;
    depth: number;
    parentId: string;
    path: string[];
    postId: string;
    reactions: {
        like: number
        love: number
        care: number
        happy: number
        wow: number
        sad: number
        angry: number
    };
    replyCount: number;
    updatedAt: string;
    _id: string;
    replies: RealDataMessage[];
  }

interface CommentListProps {
  postId: string
  initialComments?: RealDataMessage[]
}

export function CommentList({ postId, initialComments = [] }: CommentListProps) {
  const [comments, setComments] = useState<RealDataMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null)

  const loadMoreComments = async () => {
    setIsLoading(true)
    try {
      // Fetch more comments using your API
      const response = await fetch(`/api/posts/${postId}/comments?lastCreatedAt=${lastCreatedAt}`)
      const newComments = await response.json()
      setComments((prev) => [...prev, ...newComments])
      if (newComments.length > 0) {
        setLastCreatedAt(newComments[newComments.length - 1].createdAt)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddComment = async (content: string) => {
    // Add comment using your API
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
    const newComment = await response.json()
    setComments((prev) => [newComment, ...prev])
  }

  const handleReply = async (commentId: string, content: string) => {
    // Add reply using your API
    const response = await fetch(`/api/comments/${commentId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
    const newReply = await response.json()
    // Update the UI to show the new reply
    setComments((prev) => [...prev, newReply])
  }

  const handleReact = async (commentId: string, type: string) => {
    // Add reaction using your API
    await fetch(`/api/comments/${commentId}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    })
    // Update the UI to show the new reaction count
    setComments((prev) =>
      prev.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            reactions: {
              ...comment.reactions,
              [type]: comment.reactions[type as keyof typeof comment.reactions] + 1,
            },
          }
        }
        return comment
      }),
    )
  }

  const handleLoadReplies = async (commentId: string) => {
    // Fetch replies using your API
    const response = await fetch(`/api/comments/${commentId}/replies`)
    const replies = await response.json()
    // Add replies to the comments list
    setComments((prev) => [...prev, ...replies])
  }


  
   useEffect(() => {

    const cursor = ''

      fetch(
        `http://localhost:5500/api/v1/add/comments/67b5be5bf0fa2c1e7c5c0250${cursor ? `?lastCreatedAt=${cursor}` : ""}`,
        {
          method: "GET",
          credentials: "include",
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {

            console.log(data)

            setComments((prev) => [...prev, ...data])
          } else {
            // setHasMore(false)
          }
        })
    }, [])


  return (
    <div className="space-y-4">
      <CommentForm onSubmit={handleAddComment} />
      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            id={comment._id}
            content={comment.content}
            author={comment.author}
            replyToUser={comment.replyToUser}
            reactions={comment.reactions}
            replyCount={comment.replyCount}
            createdAt={comment.createdAt}
            depth={comment.depth}
            onReply={handleReply}
            onReact={handleReact}
            onLoadReplies={handleLoadReplies}
          />
        ))}
      </div>
      {comments.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={loadMoreComments} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More Comments"}
          </Button>
        </div>
      )}
    </div>
  )
}

