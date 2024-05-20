import { Ref, forwardRef } from "react";
import SinglePostItem from "@/components/photos/SinglePostItem";
import { IPostDoc } from "@/interfaces/post.interface";

interface Props {
  post: IPostDoc;
}

const SinglePhoto = forwardRef(({ post }: Props, ref: Ref<HTMLDivElement>) => {
  return (
    <>
      {post.files?.length > 0 ? (
        post.files.map((image, index) => (
          <SinglePostItem
            key={index}
            post={post?.post}
            imageUrl={image?.path}
            ref={ref}
          />
        ))
      ) : (
        <SinglePostItem
          post={post?.post}
          imageUrl={post.gifUrl as string}
          ref={ref}
        />
      )}
    </>
  );
});

export default SinglePhoto;
