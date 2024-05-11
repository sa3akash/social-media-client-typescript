import { IPostDoc } from "@/interfaces/post.interface";

interface CommonType {
  currentPage: number;
  numberOfPages: number;
}

interface PostQuerytype extends CommonType {
  posts: IPostDoc[];
}

export interface MainPostQueryType {
  pageParams: number[];
  pages: PostQuerytype[];
}
