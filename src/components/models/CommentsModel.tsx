import React, { useCallback, useEffect, useState } from "react";
import { Send } from "lucide-react";

import Comment from "./item/SingleComment";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { config } from "@/config";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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

interface Props {
  postId: string;
}
const CommentsModel: React.FC<Props> = ({ postId }) => {
  const [flatComments, setFlatComments] = useState<IComment[]>([]);
  const [treeComments, setTreeComments] = useState<ICommentNode[]>([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [showSeeMore, setShowSeeMore] = useState(true);

  const {user} = useSelector((store:RootState)=>store.auth)

  const fetchComments = useCallback(
    async (cursor?: string) => {
      const response = await fetch(
        `${config.apiUrl}/comments/get/${postId}${
          cursor ? `?lastCreatedAt=${cursor}` : ""
        }`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      return await response.json();
    },
    [postId]
  );

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

    const response = await fetch(`${config.apiUrl}/comments/add`, {
      method: "POST",
      body: JSON.stringify({
        content: content,
        postId: postId,
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
    fetch(`${config.apiUrl}/comments/update/${commentId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
  };

  const deleteComment = (commentId: string) => {
    setFlatComments((prevComments) =>
      prevComments.filter((c) => c._id !== commentId)
    );
    fetch(`${config.apiUrl}/comments/delete/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
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

    console.log(commentId);
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
      `${config.apiUrl}/comments/reply/${parentId}${
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
    <div className="mx-auto max-w-2xl w-full h-[92%] flex gap-4">
      <div className="w-full h-full md:rounded-lg overflow-y-scroll px-2">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="mb-4">
          <Textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Write a comment..."
            className="mb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
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
            currentUserId={user?.authId as string}
          />
        ))}
        {showSeeMore && (
          <Button onClick={loadMoreComments} variant="outline" className="mt-4">
            See More Comments
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentsModel;
