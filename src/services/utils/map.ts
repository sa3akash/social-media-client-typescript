// reaction
import LoveReaction from "@/assets/reactions/love.svg";
import LikeReaction from "@/assets/reactions/like.svg";
import SadReaction from "@/assets/reactions/sad.svg";
import WowReaction from "@/assets/reactions/wow.svg";
import AngryReaction from "@/assets/reactions/angry.svg";
import HappyReaction from "@/assets/reactions/happy.svg";
import CareReaction from "@/assets/reactions/care.svg";
// gif
import LoveReactionGif from "@/assets/reactions/love.gif";
import LikeReactionGif from "@/assets/reactions/like.gif";
import SadReactionGif from "@/assets/reactions/sad.gif";
import WowReactionGif from "@/assets/reactions/wow.gif";
import AngryReactionGif from "@/assets/reactions/angry.gif";
import HappyReactionGif from "@/assets/reactions/haha.gif";
import CareReactionGif from "@/assets/reactions/care.gif";
// privary
import PublicIcon from "@/assets/icons/publicBig.png";
import PrivateIcon from "@/assets/icons/PrivateIcon.png";
import OnlyMe from "@/assets/icons/onlyMeBig.png";

// feeling
import HappyFeelingIcon from "@/assets/feelings/happy.png";
import ExcitedFeelingIcon from "@/assets/feelings/excited.png";
import BlessedFeelingIcon from "@/assets/feelings/blessed.png";
import LovedFeelingIcon from "@/assets/feelings/loved.png";
import RelaxedFeelingIcon from "@/assets/feelings/relaxed.png";
import SadFeelingIcon from "@/assets/feelings/sad.png";
import CrazyFeelingIcon from "@/assets/feelings/crazy.png";
import BlissfulFeelingIcon from "@/assets/feelings/blissful.png";
import inloveFeelingIcon from "@/assets/feelings/inlove.png";
import lovelyFeelingIcon from "@/assets/feelings/lovely.png";
import coolFeelingIcon from "@/assets/feelings/cool.png";
import gratefulFeelingIcon from "@/assets/feelings/grateful.png";
import lazyFeelingIcon from "@/assets/feelings/lazy.png";
import amusedFeelingIcon from "@/assets/feelings/amused.png";
import fantasticFeelingIcon from "@/assets/feelings/fantastic.png";
import festiveFeelingIcon from "@/assets/feelings/festive.png";
import prettyFeelingIcon from "@/assets/feelings/pretty.png";
import secureFeelingIcon from "@/assets/feelings/secure.png";
import sillyFeelingIcon from "@/assets/feelings/silly.png";
import stupidFeelingIcon from "@/assets/feelings/stupid.png";
import thankfulFeelingIcon from "@/assets/feelings/thankful.png";
import wonderfulFeelingIcon from "@/assets/feelings/wonderful.png";

// notifications
import CommentIcon from "@/assets/images/ic_commentGreen.svg";
import CommunityIcon from "@/assets/images/ic_friendsBlue.svg";
import UserIcon from "@/assets/images/userCheck.svg";

// post model
import SaveLink from "@/assets/images/post-model/bookmark.svg";
import HidePost from "@/assets/images/post-model/x-circle.svg";
import HidePostAll from "@/assets/images/post-model/x-square.svg";
import User from "@/assets/images/post-model/user.svg";
import EditIcon from "@/assets/images/post-model/square-pen.svg";
import DeleteIcon from "@/assets/images/post-model/trash.svg";
import PinIcon from "@/assets/images/post-model/pin.svg";
import ReportIcon from "@/assets/images/post-model/report.svg";

// sidebar
import Feed from "@/assets/images/feed-off.svg";
import Friends from "@/assets/images/friends.svg";
import Events from "@/assets/images/evant.svg";
import Videos from "@/assets/images/videos.svg";
import Images from "@/assets/images/images.svg";
import MarketPlace from "@/assets/images/marketPlase.svg";
import NotificatonsOff from "@/assets/images/ic_Notification_off.svg";
import Notificatons from "@/assets/images/Notification.svg";
import ChatIcon from '@/assets/images/Chat.svg'
import ChatOffIcon from '@/assets/images/Chat_Off.svg'

export const ReactionIconMap = {
  like: LikeReaction,
  love: LoveReaction,
  care: CareReaction,
  happy: HappyReaction,
  wow: WowReaction,
  sad: SadReaction,
  angry: AngryReaction,
};

export const ReactionsList = [
  "like",
  "love",
  "care",
  "happy",
  "wow",
  "sad",
  "angry",
];

export const ReactionIconMapGif = {
  love: LoveReactionGif,
  like: LikeReactionGif,
  sad: SadReactionGif,
  wow: WowReactionGif,
  angry: AngryReactionGif,
  happy: HappyReactionGif,
  care: CareReactionGif,
};

export const PrivacyIconMap = {
  Public: PublicIcon,
  Private: PrivateIcon,
  "Only me": OnlyMe,
};

export const feelingIconMap = {
  happy: HappyFeelingIcon,
  excited: ExcitedFeelingIcon,
  blessed: BlessedFeelingIcon,
  loved: LovedFeelingIcon,
  relaxed: RelaxedFeelingIcon,
  sad: SadFeelingIcon,
  crazy: CrazyFeelingIcon,
  blissful: BlissfulFeelingIcon,
  "in love": inloveFeelingIcon,
  lovely: lovelyFeelingIcon,
  cool: coolFeelingIcon,
  grateful: gratefulFeelingIcon,
  lazy: lazyFeelingIcon,
  amused: amusedFeelingIcon,
  fantastic: fantasticFeelingIcon,
  festive: festiveFeelingIcon,
  pretty: prettyFeelingIcon,
  secure: secureFeelingIcon,
  silly: sillyFeelingIcon,
  stupid: stupidFeelingIcon,
  thankful: thankfulFeelingIcon,
  wonderful: wonderfulFeelingIcon,
};

export const bgColors = [
  "#ffffff",
  "#f44336",
  "#e91e63",
  "#2196f3",
  "#9c27b0",
  "#3f51b5",
  // '#00bcd4',
  "#4caf50",
  "#ff9800",
  // '#8bc34a',
  "#009688",
  "#03a9f4",
  // '#cddc39'
];

export const reactionColorMap = {
  like: "#50b5ff",
  love: "#f33e58",
  care: "#f7b125",
  happy: "#f7b125",
  wow: "#f7b124",
  sad: "#f7b124",
  angry: "#e9710f",
};

export const notificationIconMap = {
  comment: CommentIcon,
  community: CommunityIcon,
  follow: UserIcon,
  love: LoveReaction,
  like: LikeReaction,
  sad: SadReaction,
  wow: WowReaction,
  angry: AngryReaction,
  happy: HappyReaction,
  care: CareReaction,
};

export const postModelIconMap = {
  saveLink: SaveLink,
  hidePost: HidePost,
  hideAllPost: HidePostAll,
  unFollow: User,
  edit: EditIcon,
  delete: DeleteIcon,
  pin: PinIcon,
  report: ReportIcon,
};


export const leftSidebarIconMap = {
  feed:Feed,
  friends:Friends,
  events:Events,
  videos: Videos,
  notificationOff: NotificatonsOff,
  notifications: Notificatons,
  photos: Images,
  marketplace: MarketPlace,
  Messanger: ChatIcon,
  MessangerOff: ChatOffIcon,
};