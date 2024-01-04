import { IUserDoc } from "@/interfaces/auth.interface";
import { IPostDoc, IReactions } from "@/interfaces/post.interface";
import { UserUtils } from "@/services/utils/userUtils";

export class PostUtils {
  static checkPrivacy(
    post: IPostDoc,
    profileId: string,
    following: IUserDoc[],
  ): boolean {
    const isPublic = post?.privacy === "Public";
    const isPrivate =
      post?.privacy === "Private" &&
      UserUtils.checkIfUserFollowed(following, post?.creator.authId, profileId);
    const isOnlyMe =
      post?.privacy === "Only me" && post?.creator.authId === profileId;

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

  static sumAllReactions(reactions: IReactions): number {
    let sum = 0;
    for (const reaction in reactions) {
      sum += reactions[reaction as keyof IReactions];
    }
    return sum;
  }

  static formateReactions(reactions: IReactions) {
    const postReactions = [];
    for (const [key, value] of Object.entries(reactions)) {
      if (value > 0) {
        const reactionObject = {
          type: key,
          value,
        };
        postReactions.push(reactionObject);
      }
    }
    return postReactions;
  }

  static filterReactions(
    reactions: IReactions,
    count: number,
  ): [string, number][] {
    // const sortedReactions = Object.entries(reactions).sort(
    //   ([, countA], [, countB]) => countB - countA
    // );
    const sortedReactions = Object.entries(reactions)
      .sort(([, countA], [, countB]) => countB - countA)
      .filter(([, count]) => count !== 0)
      .slice(0, count);

    return sortedReactions;
  }
}
