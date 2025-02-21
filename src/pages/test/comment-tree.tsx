import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ThumbsUp,
  Edit,
  Trash2,
  Send,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface IReactions {
  like: number;
  love: number;
  care: number;
  happy: number;
  wow: number;
  sad: number;
  angry: number;
}

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

export interface IComment {
  author: AuthUser;
  replyToUser?: AuthUser;
  content: string;
  createdAt: string;
  depth: number;
  parentId?: string;
  path: string[];
  postId: string;
  reactions: IReactions;
  replyCount: number;
  updatedAt: string;
  _id: string;
}

interface ICommentNode extends IComment {
  replies: ICommentNode[];
}

interface CommentProps {
  comment: ICommentNode;
  onAddReply: (parentId: string, content: string, replyToUser: string) => void;
  onUpdateComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onLikeComment: (commentId: string) => void;
  fetchNestedComments: (
    parentId: string,
    cursor?: string
  ) => Promise<IComment[]>;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddReply,
  onUpdateComment,
  onDeleteComment,
  onLikeComment,
  fetchNestedComments,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [hasMoreReplies, setHasMoreReplies] = useState(
    comment.replyCount > comment.replies.length
  );
  const [cursor, setCursor] = useState<string | undefined>(undefined); // Track the cursor for pagination

  // Fetch replies when the user expands the replies section or clicks "Load More Replies"
  const handleFetchReplies = useCallback(
    async (nextCursor: string | undefined) => {
      if (hasMoreReplies) {
        const newReplies = await fetchNestedComments(comment._id, nextCursor);

        if (newReplies.length > 0) {
          // Update the cursor to the last reply's createdAt timestamp
          setCursor(newReplies[newReplies.length - 1].createdAt);
        }

        // Update hasMoreReplies based on whether there are more replies to fetch
        if (newReplies.length < 5) {
          setHasMoreReplies(false);
        }
      }
    },
    [comment._id, fetchNestedComments, hasMoreReplies]
  );

  // Automatically fetch replies when the section is expanded
  useEffect(() => {
    if (isExpanded && comment.replies.length === 0 && comment.replyCount > 0) {
      handleFetchReplies("");
    }
  }, [
    isExpanded,
    comment.replies.length,
    comment.replyCount,
    handleFetchReplies,
  ]);

  const handleAddReply = () => {
    onAddReply(comment._id, replyContent, comment.author._id);
    setReplyContent("");
    setIsReplying(false);
    setIsExpanded(true);
    setHasMoreReplies(true);
  };

  const handleUpdateComment = () => {
    onUpdateComment(comment._id, editContent);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      {/* Comment content and actions */}
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage
            src={comment.author.profilePicture}
            alt={comment.author.name.first}
          />
          <AvatarFallback>{comment.author.name.first.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-secondary p-4 rounded-lg">
            {/* Comment header and content */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{comment.author.name.first}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            {comment.replyToUser && (
              <p className="text-sm text-muted-foreground mb-2">
                Replying to{" "}
                <span className="font-semibold">
                  {comment.replyToUser.name.first}
                </span>
              </p>
            )}
            {isEditing ? (
              <>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mb-2"
                />

                <Button onClick={handleUpdateComment}>Update Comment</Button>
              </>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
          {/* Comment actions (like, reply, edit, delete) */}
          <div className="flex items-center mt-2 space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLikeComment(comment._id)}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {comment.reactions.like}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Reply
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteComment(comment._id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
          {/* Reply input */}
          {isReplying && (
            <div className="mt-4">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write your reply..."
                // placeholder={`Reply to @${comment.author.name.first}...`}
                className="mb-2"
              />
              <Button onClick={handleAddReply}>
                <Send className="w-4 h-4 mr-2" />
                Send Reply
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Nested replies */}
      {comment.replyCount > 0 && (
        <div className="ml-12 mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Replies
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show Replies ({comment.replyCount})
              </>
            )}
          </Button>
          {isExpanded && (
            <div className="space-y-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  onAddReply={onAddReply}
                  onUpdateComment={onUpdateComment}
                  onDeleteComment={onDeleteComment}
                  onLikeComment={onLikeComment}
                  fetchNestedComments={fetchNestedComments}
                />
              ))}
              {hasMoreReplies && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFetchReplies(cursor)}
                >
                  Load More Replies
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CommentTree: React.FC = () => {
  const [flatComments, setFlatComments] = useState<IComment[]>([]);
  const [treeComments, setTreeComments] = useState<ICommentNode[]>([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showSeeMore, setShowSeeMore] = useState(true);

  const fetchComments = useCallback(async (cursor?: string) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/add/comments/67b5be5bf0fa2c1e7c5c0250${
        cursor ? `?lastCreatedAt=${cursor}` : ""
      }`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    return await response.json();
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      const comments = await fetchComments();
      setFlatComments(comments);
    };
    loadComments();
  }, [fetchComments]);

  useEffect(() => {
    const buildCommentTree = (comments: IComment[]): ICommentNode[] => {
      const commentMap: { [key: string]: ICommentNode } = {};
      const roots: ICommentNode[] = [];

      comments.forEach((comment) => {
        const node: ICommentNode = { ...comment, replies: [] };
        commentMap[comment._id] = node;
      });

      comments.forEach((comment) => {
        if (comment.parentId === null) {
          roots.push(commentMap[comment._id]);
        } else {
          const parent = commentMap[comment.parentId!];
          if (parent) {
            parent.replies.push(commentMap[comment._id]);
          }
        }
      });

      return roots;
    };

    setTreeComments(buildCommentTree(flatComments));
  }, [flatComments]);

  const addComment = async (
    parentId: string | null,
    content: string,
    replyToUser: string | null
  ) => {
    if (!content) return;

    const response = await fetch(`http://localhost:5500/api/v1/add/comments`, {
      method: "POST",
      body: JSON.stringify({
        content: content,
        postId: "67b5be5bf0fa2c1e7c5c0250",
        ...(parentId && { parentId: parentId }),
        ...(replyToUser && { replyToUser: replyToUser }),
      }),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const newComment = await response.json();

    setFlatComments((prevComments) => {
      const updatedComments = [newComment, ...prevComments];
      return updatedComments.map((comment) => {
        if (comment._id === parentId) {
          return { ...comment, replyCount: (comment.replyCount || 0) + 1 };
        }
        return comment;
      });
    });
  };

  const updateComment = (commentId: string, content: string) => {
    setFlatComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, content, updatedAt: new Date().toISOString() }
          : comment
      )
    );
  };

  const deleteComment = (commentId: string) => {
    setFlatComments((prevComments) =>
      prevComments.filter((c) => c._id !== commentId)
    );
    // todo: call api
  };

  const likeComment = (commentId: string) => {
    setFlatComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              reactions: {
                ...comment.reactions,
                like: comment.reactions.like + 1,
              },
            }
          : comment
      )
    );
  };

  const loadMoreComments = async () => {
    const newComments = await fetchComments(
      flatComments[flatComments.length - 1]?.createdAt
    );
    setFlatComments((prevComments) => [...prevComments, ...newComments]);
    if (newComments?.length !== 5) {
      setShowSeeMore(false);
    }
  };

  const fetchNestedComments = async (parentId: string, cursor?: string) => {
    const response = await fetch(
      `http://localhost:5500/api/v1/add/comments/reply/${parentId}${
        cursor ? `?lastCreatedAt=${cursor}` : ""
      }`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    setFlatComments((prevComments) => {
      const newComments = [...prevComments];
      data.forEach((newComment: IComment) => {
        const existingIndex = newComments.findIndex(
          (c) => c._id === newComment._id
        );
        if (existingIndex === -1) {
          newComments.push(newComment);
        } else {
          newComments[existingIndex] = newComment;
        }
      });
      return newComments;
    });
    return data;
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
        <Textarea
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
          placeholder="Write a comment..."
          className="mb-2"
        />
        <Button
          onClick={() => {
            addComment(null, newCommentContent, null);
            setNewCommentContent("");
          }}
        >
          <Send className="w-4 h-4 mr-2" />
          Add Comment
        </Button>
      </div>
      {treeComments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          onAddReply={addComment}
          onUpdateComment={updateComment}
          onDeleteComment={deleteComment}
          onLikeComment={likeComment}
          fetchNestedComments={fetchNestedComments}
        />
      ))}
      {showSeeMore && (
        <Button onClick={loadMoreComments} variant="outline" className="mt-4">
          See More Comments
        </Button>
      )}
    </div>
  );
};

export default CommentTree;
