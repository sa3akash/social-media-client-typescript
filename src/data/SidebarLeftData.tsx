import Feed from '@/assets/images/feed-off.svg'
import Friends from '@/assets/images/friends.svg'
import Events from '@/assets/images/evant.svg'
import Videos from '@/assets/images/videos.svg'
import Images from '@/assets/images/images.svg'
import Files from '@/assets/images/files.svg'
import MarketPlace from '@/assets/images/marketPlase.svg'

export interface LeftSidebarDoc {
    _id: number;
    imageUrl: string;
    name: string;
}

export const sidebarLeft:LeftSidebarDoc[] = [
    {
        _id: 1,
        imageUrl: Feed,
        name: 'Feed'
    },
    {
        _id: 1,
        imageUrl: Friends,
        name: 'Friends'
    },
    {
        _id: 1,
        imageUrl: Events,
        name: 'Events'
    },
    {
        _id: 1,
        imageUrl: Videos,
        name: 'WatchVideos'
    },
    {
        _id: 1,
        imageUrl: Images,
        name: 'Photos'
    },
    {
        _id: 1,
        imageUrl: Files,
        name: 'Files'
    },
    {
        _id: 1,
        imageUrl: MarketPlace,
        name: 'Marketplace'
    },
];


export interface PageSidebarDoc {
    _id: number;
    imageUrl: string;
    name: string;
}

export const sidebarLeftPage:PageSidebarDoc[] = [
    {
        _id: 1,
        imageUrl: '',
        name: 'Football FC'
    },
    {
        _id: 2,
        imageUrl: '',
        name: 'Badminton Club'
    },
    {
        _id: 3,
        imageUrl: '',
        name: 'UI/UX Community'
    },
    {
        _id: 4,
        imageUrl: '',
        name: 'Web Developer'
    },
    {
        _id: 5,
        imageUrl: '',
        name: 'MERN Stack'
    },
    {
        _id: 6,
        imageUrl: '',
        name: 'Graphics Design'
    }
];
