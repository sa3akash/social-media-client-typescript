import React from "react";
import SinglePostItem from "@/components/photos/SinglePostItem";
import { IPostDoc } from "@/interfaces/post.interface";

interface Props {
  post: IPostDoc;
}

const SinglePhoto: React.FC<Props> = ({ post }) => {
  return (
    <>
      {post.files?.length > 0 &&
        post.files.map((image, index) => (
          <SinglePostItem
            key={index}
            post={post?.post}
            imageUrl={image?.path}
          />
        ))}
    </>
  );
};

export default SinglePhoto;
