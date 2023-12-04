import SaveLink from "@/assets/images/SaveLInk.svg"
import HidePost from "@/assets/images/ic_hidePost.svg"
import HidePostAll from "@/assets/images/hide_all.svg"
import User from "@/assets/images/ic_user_model.svg"

export interface IPostHederMenu{
    _id: string;
    title: string;
    subTitle: string;
    icon: string;
}

export const postHederMenu: IPostHederMenu[] =  [
    {
        _id: '1',
        title: 'Save Link',
        subTitle: 'Add this to your saved items',
        icon: SaveLink
    },
    {
        _id: '2',
        title: 'Hide Post',
        subTitle: 'See fewer post like this',
        icon: HidePost
    },
    {
        _id: '1',
        title: 'Hide all from “Pan Feng Shui”',
        subTitle: 'Stop seeing post from this person',
        icon: HidePostAll
    },
    {
        _id: '1',
        title: 'Unfollow “Pan Feng Shui”',
        subTitle: 'Disconnected with this person',
        icon: User
    },
];