import { IUserDoc } from "@/interfaces/auth.interface";

export class UserUtils {
  static checkIfUserBlocked(blocked: string[], userId: string): boolean {
    return blocked.some((id) => id === userId);
  }

  static checkIfUserFollowed(
    userFollowes: IUserDoc[],
    postCreatorId: string,
    userId: string,
  ): boolean {
    return userFollowes.some(
      (user) => user.authId === postCreatorId || postCreatorId === userId,
    );
  }
}
