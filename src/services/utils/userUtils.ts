import { IPostDoc } from "@/interfaces/post.interface";
import { store } from "@/store";
import { PostUtils } from "@/services/utils/postUtils";

export class UserUtils {
  static checkIfUserBlocked(blocked: string[], userId: string): boolean {
    return blocked.some((id) => id === userId);
  }

  static checkIfUserFollowed(
    userFollowes: string[],
    postCreatorId: string,
    profileId: string
  ): boolean {
    return (
      userFollowes.some((user) => user === postCreatorId) ||
      postCreatorId === profileId
    );
  }

  static checkPrivacyPost(post: IPostDoc) {
    const { blocked, user, following } = store.getState().auth;

    if (
      !UserUtils.checkIfUserBlocked(blocked, post.authId) &&
      PostUtils.checkPrivacy(post, `${user?.authId}`, following)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
