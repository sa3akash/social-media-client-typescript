import React, { useCallback, useEffect, useState } from "react";
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
import { timeAgo } from "@/services/utils/timeAgo";
import { Link } from "react-router-dom";
import { IComment } from "../CommentsModel";
import { extractLinks } from "@/services/genaral/messageUtils";
import MessangerLinkPreview from "@/components/link/MessangerLinkPreview";

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
  currentUserId: string
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onAddReply,
  onUpdateComment,
  onDeleteComment,
  onLikeComment,
  fetchNestedComments,
  currentUserId
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

  const extractText = extractLinks(comment.content);

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
              <h3 className="font-semibold flex items-center gap-2">
                <Link
                  to={`/u/${comment?.author._id}`}
                  className="hover:underline capitalize"
                >
                  {comment?.author.name.first} {comment?.author.name.last}
                </Link>

                <span className="text-xs text-muted-foreground">
                  {comment.createdAt !== comment.updatedAt && "(edited)"}
                </span>
              </h3>
              <span className="text-sm text-muted-foreground">
                {timeAgo.transform(`${comment?.createdAt}`)}
              </span>
            </div>

            {isEditing ? (
              <>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Button onClick={handleUpdateComment}>Update Comment</Button>
              </>
            ) : (
              <div>
                {comment?.replyToUser && (
                  <span className="text-blue-500 mr-1">
                    @
                    <Link
                      to={`/u/${comment.replyToUser._id}`}
                      className="hover:underline"
                    >
                      {comment.replyToUser.name.first} {"  "}
                      {comment.replyToUser.name.last}
                    </Link>
                  </span>
                )}
                 <p
        dangerouslySetInnerHTML={{ __html: extractText.originalString }}
        className="flex flex-wrap"
      />
              </div>
            )}
          </div>
          <div className="-my-1 mb-2">
          {extractText.links.length > 0 ? (
        <MessangerLinkPreview url={extractText.links[0]} />
      ) : null}
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
            {currentUserId === comment?.author?._id && <>
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
              </>
            }
          </div>
          {/* Reply input */}
          {isReplying && (
            <div className="mt-4">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                // placeholder="Write your reply..."
                placeholder={`Reply to @${comment.author.name.first}...`}
                className="mb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  currentUserId={currentUserId}
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

export default Comment;

// ==================

// import React, { useCallback, useEffect, useState } from 'react'
// import {
//   ChevronDown,
//   ChevronUp,
//   MessageCircle,
//   ThumbsUp,
//   Edit,
//   Trash2,
//   Send,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Link } from 'react-router-dom';

// interface IReactions {
//     like: number;
//     love: number;
//     care: number;
//     happy: number;
//     wow: number;
//     sad: number;
//     angry: number;
//   }

//   export interface AuthUser {
//     avatarColor: string;
//     coverPicture: string;
//     createdAt: string;
//     email: string;
//     name: { first: string; last: string; nick: string };
//     profilePicture: string;
//     quote: string;
//     uId: string;
//     username: string;
//     _id: string;
//   }
// export interface IComment {
//   author: AuthUser;
//   replyToUser?: AuthUser;
//   content: string;
//   createdAt: string;
//   depth: number;
//   parentId?: string;
//   path: string[];
//   postId: string;
//   reactions: IReactions;
//   replyCount: number;
//   updatedAt: string;
//   _id: string;
// }

// interface ICommentNode extends IComment {
//   replies: ICommentNode[];
// }

// interface CommentProps {
//   comment: ICommentNode;
//   onAddReply: (parentId: string, content: string, replyToUser: string) => void;
//   onUpdateComment: (commentId: string, content: string) => void;
//   onDeleteComment: (commentId: string) => void;
//   onLikeComment: (commentId: string) => void;
//   fetchNestedComments: (
//     parentId: string,
//     cursor?: string
//   ) => Promise<IComment[]>;
// }

// const Comment: React.FC<CommentProps> = ({
//     comment,
//     onAddReply,
//     onUpdateComment,
//     onDeleteComment,
//     onLikeComment,
//     fetchNestedComments,
//   }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [isReplying, setIsReplying] = useState(false);
//     const [replyContent, setReplyContent] = useState("");
//     const [isEditing, setIsEditing] = useState(false);
//     const [editContent, setEditContent] = useState(comment.content);
//     const [hasMoreReplies, setHasMoreReplies] = useState(
//       comment.replyCount > comment.replies.length
//     );
//     const [cursor, setCursor] = useState<string | undefined>(undefined); // Track the cursor for pagination

//     // Fetch replies when the user expands the replies section or clicks "Load More Replies"
//     const handleFetchReplies = useCallback(
//       async (nextCursor: string | undefined) => {
//         if (hasMoreReplies) {
//           const newReplies = await fetchNestedComments(comment._id, nextCursor);

//           if (newReplies.length > 0) {
//             // Update the cursor to the last reply's createdAt timestamp
//             setCursor(newReplies[newReplies.length - 1].createdAt);
//           }

//           // Update hasMoreReplies based on whether there are more replies to fetch
//           if (newReplies.length < 5) {
//             setHasMoreReplies(false);
//           }
//         }
//       },
//       [comment._id, fetchNestedComments, hasMoreReplies]
//     );

//     // Automatically fetch replies when the section is expanded
//     useEffect(() => {
//       if (isExpanded && comment.replies.length === 0 && comment.replyCount > 0) {
//         handleFetchReplies("");
//       }
//     }, [
//       isExpanded,
//       comment.replies.length,
//       comment.replyCount,
//       handleFetchReplies,
//     ]);

//     const handleAddReply = () => {
//       onAddReply(comment._id, replyContent, comment.author._id);
//       setReplyContent("");
//       setIsReplying(false);
//       setIsExpanded(true);
//       setHasMoreReplies(true);
//     };

//     const handleUpdateComment = () => {
//       onUpdateComment(comment._id, editContent);
//       setIsEditing(false);
//     };

//     return (
//         <div className="mb-4 border-l-2 border-gray-200 pl-4">
//         <div className="mb-2 flex items-start gap-2">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src={comment.author.profilePicture} alt={comment.author.name.first} />
//             <AvatarFallback>{comment.author.name.first.charAt(0)}</AvatarFallback>
//           </Avatar>
//           <div>
//             <Link to={`/command/${comment.author._id}`} className="font-bold hover:underline">{comment.author.name.first}</Link>
//             <p>
//               {comment.replyToUser && (
//                 <span className="text-blue-500 mr-1">
//                   @<Link to={`/command/${comment.replyToUser._id}`} className="hover:underline">{comment.replyToUser.name.first}</Link>
//                 </span>
//               )}
//               {comment.content}
//             </p>
//           </div>
//         </div>
//         {!isReplying && (
//           <Button variant="outline" size="sm" onClick={() => setIsReplying(true)}>
//             Reply
//           </Button>
//         )}
//         {isReplying && (
//           <div className="mt-2">
//             <Textarea
//               value={replyContent}
//               onChange={(e) => setReplyContent(e.target.value)}
//               placeholder={`Reply to @${comment.author.name.first}...`}
//               className="mb-2 focus-visible:ring-0 focus-visible:ring-offset-0"
//             />
//             <Button size="sm" onClick={()=>{}}>Submit Reply</Button>
//             <Button variant="outline" size="sm" onClick={() => setIsReplying(false)} className="ml-2">
//               Cancel
//             </Button>
//           </div>
//         )}
//         {comment.replies.length > 0 && (
//           <div className="ml-4 mt-2">
//             {comment.replies.map((reply,i) => (
//               <Comment key={i} {...reply} onAddReply={onAddReply} comment={reply} fetchNestedComments={fetchNestedComments} onDeleteComment={onDeleteComment} onLikeComment={onLikeComment} onUpdateComment={onUpdateComment} />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

// export default Comment
