import { IUserDoc } from "@/interfaces/auth.interface";
import { IPostDoc } from "@/interfaces/post.interface";
import { UserUtils } from "@/services/utils/userUtils";

export class PostUtils {
  static checkPrivacy(
    post: IPostDoc,
    profileId: string,
    following: IUserDoc[]
  ): boolean {
    const isPublic = post?.privacy === "Public";
    const isPrivate =
      post?.privacy === "Private" &&
      UserUtils.checkIfUserFollowed(following, post?.creator._id, profileId);
    const isOnlyMe =
      post?.privacy === "Only me" && post?.creator._id === profileId;

    return isPublic || isPrivate || isOnlyMe;
  }

  static positionCursor(elementId: string) {
    const element: HTMLElement | null = document.getElementById(`${elementId}`);
    const selection = window.getSelection();
    const range = document.createRange();
    selection!.removeAllRanges();
    element && range.selectNodeContents(element);
    range.collapse(false);
    selection?.addRange(range);
    element?.focus();
  }
}
