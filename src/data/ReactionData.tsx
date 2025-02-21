import { IReactionDoc } from "@/interfaces/reaction.interface";

export const reactionData:IReactionDoc[] = [
    {
        _id: '123456',
        authId: '123456',
        createdAt: '20/10/2015',
        targetId: '123456',
        creator: {
            authId: '123',
            avatarColor: '#F4CE14',
            coverPicture: '',
            email: 'Nathan@yesenia.net',
            name: {
            first: 'Clementine',
            last: 'Bauch',
            nick: ''  
            },
            profilePicture: '',
            quote: 'Interaction Designer | Coffe Addict | Part time Traveller | Full time Mom of Baby and Bayi.',
            uId: '123',
            username: 'Samantha'
        },
        type: 'love',
    },
]