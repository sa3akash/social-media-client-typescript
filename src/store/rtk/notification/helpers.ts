import { INotification } from "@/interfaces/notificaton.interface";
import { notificationApi } from "./notificationSlice";



export const notificationHelpers = {
    addNotification: (notification: INotification) => {
        return notificationApi.util.updateQueryData(
            "getNotification",0,(draft) => {
                draft.notifications = [notification, ...draft.notifications];
            }
        );
    },

    update: (id: string) => {
        return notificationApi.util.updateQueryData(
            "getNotification", 0, (draft) => {
                const index = draft.notifications.findIndex(
                    (post: INotification) => post._id === id
                );

                if (index !== -1) {
                    draft.notifications[index] = {
                        ...draft.notifications[index],
                        read: true,};
                }
            }
        );
    },

    delete: (id: string) => {
        return notificationApi.util.updateQueryData(
            "getNotification",0, // Ensure correct args are passed
            (draft) => {
                const index = draft.notifications.findIndex((p: INotification) => p._id === id);
                if (index !== -1) {
                    draft.notifications.splice(index, 1);
                }
            }
        );
    },
};