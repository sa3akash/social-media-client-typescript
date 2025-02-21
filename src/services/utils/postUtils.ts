import { IUserReactionDoc } from "@/interfaces/auth.interface";
import { IPostDoc, IReactions } from "@/interfaces/post.interface";
import { UserUtils } from "@/services/utils/userUtils";

export class PostUtils {
  static checkPrivacy(
    post: IPostDoc,
    profileId: string,
    following: string[],
  ): boolean {
    const isPublic = post?.privacy === "Public";

    const isPrivate =
      post?.privacy === "Private" &&
      UserUtils.checkIfUserFollowed(following, post?.authId, profileId);

    const isOnlyMe =
      post?.privacy === "Only me" && post?.creator.authId === profileId;

    return isPublic || isPrivate || isOnlyMe;
  }

  static positionCursor(mainElement: HTMLDivElement | null) {
    const element: HTMLElement | null = mainElement;
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

  static userReactionExists(
    userReaction: IUserReactionDoc[],
    postId: string,
  ): IUserReactionDoc | undefined {
    return userReaction.find((reaction) => reaction.targetId === postId);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getNameForComment(value: any[]): any[] {
    const uniqueArray = Array.from(
      new Set(
        value.map(
          (item: { creator: { authId: string } }) => item?.creator?.authId,
        ),
      ),
    ).map((id) =>
      value.find(
        (item: { creator: { authId: string } }) => item?.creator?.authId === id,
      ),
    );
    return uniqueArray;
  }
}
