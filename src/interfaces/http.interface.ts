export interface ApiReactionInterface {
  postId: string;
  type: string;
}

interface MediaData {
  url: string;
  type: string;
}


export interface ILinkPreviewMetadata {
  title: string;
  description: string;
  lang: string;
  domain: string;
  author: string | null;
  publisher: string;
  url: string;
  logo: MediaData | null;
  image: MediaData | null;
}