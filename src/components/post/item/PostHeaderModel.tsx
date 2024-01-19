import DeletePostModel from "@/components/models/DeletePostModel";
import {
  IFeelings,
  IPostDoc,
  PostModelType,
} from "@/interfaces/post.interface";
import { postModelIconMap } from "@/services/utils/map";
import { AppDispatch, RootState } from "@/store";
import { openModel } from "@/store/reducers/ModelReducer";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  post: IPostDoc;
  setOpenModel: (value: boolean) => void;
}

const PostHeaderModel: FC<Props> = ({ post, setOpenModel }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const wonPost = post?.creator?.authId === user?.authId;
  const isFollowing = post?.authId === "123";

  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="absolute z-20 top-14 right-4 w-[350px] rounded-xl bg-muted dark:bg-[#292932] borderWrapper p-2">
        {wonPost ? (
          <>
            <SingleItem
              type="pin"
              title="Pin Post"
              subTitle="Add this to your saved items."
              onClick={() => {
                setOpenModel(false);
              }}
            />
            <SingleItem
              type="edit"
              title="Edit Post"
              subTitle="Edit this post for your friends."
              onClick={() => {
                dispatch(openModel({ type: "editPost" }));
                dispatch(
                  updatePostItem({
                    _id: post._id,
                    bgColor: post.bgColor,
                    feelings: post.feelings as IFeelings,
                    files: post.files,
                    gifUrl: post.gifUrl,
                    post: post.post,
                    privacy: post.privacy,
                  })
                );

                setOpenModel(false);
              }}
            />
            <SingleItem
              type="delete"
              title="Move to trash"
              subTitle="Items in your trash are deleted."
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </>
        ) : (
          <>
            <SingleItem
              type="saveLink"
              title="Save Link"
              subTitle="Add this to your saved items."
              onClick={() => {
                setOpenModel(false);
              }}
            />
            <SingleItem
              type="hidePost"
              title="Hide Post"
              subTitle="See fewer post like this."
              onClick={() => {
                setOpenModel(false);
              }}
            />
            <SingleItem
              type="hideAllPost"
              title={`Hide all from “${post.creator.name.first} ${post.creator.name.last}”`}
              subTitle="Stop seeing post from this person."
              onClick={() => {
                setOpenModel(false);
              }}
            />
            {isFollowing && (
              <SingleItem
                type="unFollow"
                title={`Unfollow “${post.creator.name.first} ${post.creator.name.last}”`}
                subTitle="Disconnected with this person."
                onClick={() => {
                  setOpenModel(false);
                }}
              />
            )}
            <SingleItem
              type="report"
              title="Report post"
              subTitle={`We won't let “${post.creator.name.first}” who reported this.`}
              onClick={() => {
                setOpenModel(false);
              }}
            />
          </>
        )}

        {/* <Separator className="bg-primary/20" /> */}
        {isOpen && (
          <DeletePostModel postId={post._id} setOpenModel={setOpenModel} />
        )}
      </div>
    </>
  );
};

export default PostHeaderModel;

interface SingleProps {
  type: PostModelType;
  title: string;
  subTitle: string;
  onClick: () => void;
}

const SingleItem: FC<SingleProps> = ({ type, subTitle, title, onClick }) => {
  return (
    <div
      className="px-4 py-2 flex items-center gap-4 w-full cursor-pointer select-none"
      onClick={onClick}
    >
      <img
        src={postModelIconMap[type]}
        alt="icon"
        className="w-5 h-5 filter invert-0 dark:invert brightness-50 dark:brightness-100"
      />
      <div className="flex-1">
        <h3 className="text-[14px] roboto tracking-[0.1px] text-left">
          {title}
        </h3>
        <span className="text-[12px] roboto text-[#696974]">{subTitle}</span>
      </div>
    </div>
  );
};
