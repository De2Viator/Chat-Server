export interface ChatUser {
    name: string;
    photo: {
        contentType: string;
        data: string;
    },
    userId: string;
}

export interface Chat {
    lastMessage: string;
    messageDate: string;
    type: string;
    partner: ChatUser;
    user: ChatUser;
}