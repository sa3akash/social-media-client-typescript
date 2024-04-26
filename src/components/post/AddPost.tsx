// import React from "react";
import { Separator } from "@/components/ui/separator";
import PostImage from "@/assets/images/post_image.svg";
import UserAvater from "@/components/common/UserAvater";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { NameDoc } from "@/interfaces/auth.interface";
import { openModel } from "@/store/reducers/ModelReducer";

const AddPost = () => {
  const { user } = useSelector((store: RootState) => store.auth);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="cardBG md:mt-6 md:rounded-xl md:borderWrapper">
      <h3 className="hidden md:block tracking-[0.1px] text-[14px] pl-4 pt-4">
        Post Something
      </h3>
      <Separator className="my-4 hidden md:block" />

      <div className="px-4 py-4 md:px-4 md:pb-3 md:pt-0 flex justify-between items-center">
        <div className="flex gap-4 w-full">
          <UserAvater
            src={user?.profilePicture}
            name={user?.name as NameDoc}
            className="min-w-[36px] min-h-[36px]"
            avatarColor={user?.avatarColor}
            authId={user?.authId}
            indicator="hidden"
          />
          <div
            className="flex flex-1 gap-2 items-center p-2 border md:border-none rounded-lg cursor-pointer select-none"
            onClick={() =>
              dispatch(openModel({ type: "createPost" }))
            }
          >
            <span className="text-[#696974] flex-1 text-start tracking-[0.1px] text-[16px]">
              What&apos;s on your mind?
            </span>
            <div className="cursor-pointer">
              <img src={PostImage} alt="post" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
