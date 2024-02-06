import { config } from "@/config";
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
} from "@/interfaces/auth.interface";
import { ApiReactionInterface } from "@/interfaces/http.interface";
import axios, { AxiosInstance } from "axios";
import { PageURL } from "@/services/utils/pageUrl";
import { ISendMessageDataJson } from "@/interfaces/chat.interface";

const api: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// List of all the endpoints
export const loginFn = (data: ILogin) => api.post("/signin", data);
export const registerFn = (data: IRegister) => api.post("/signup", data);
export const forgotFn = (data: IForgotPassword) =>
  api.post("/forgot-password", data);
export const resetFn = (token: string, data: IResetPassword) =>
  api.post(`/reset-password/${token}`, data);
export const suggestedFriendFn = () => api.get("/users/random");
export const followUserFn = (userId: string) =>
  api.put(`user/follow/${userId}`);
export const currentUser = (authId: string) =>
  api.get(`/current-user?authId=${authId}`);
export const markAsReadNotification = (notificationId: string) =>
  api.put(`/notification/${notificationId}`);
export const deleteNotification = (notificationId: string) =>
  api.delete(`/notification/${notificationId}`);
export const getNotificaitons = (pageNumber: number) =>
  api.get(`/notifications?page=${pageNumber}`);

export const updateReaction = (body: ApiReactionInterface) =>
  api.post("/post/reaction", body);

export const getUserReaction = () => api.get("/post/reactions/user");
export const getPostReaction = (url: string) => api.get(url);
export const addComment = (data: { postId: string; comment: string }) =>
  api.post("/add-comment", data);
export const deletePost = (postId: string) => api.delete(`/post/${postId}`);
export const getLoginData = () => api.get("/login-user-data");
export const followUser = (authId: string) => api.put(`/user/follow/${authId}`);
export const sendMessageJson = (data:ISendMessageDataJson) => api.post('/chat/message',data);
export const getConversations = () => api.get('/chat/conversations');
export const getMessages = () => api.get('/chat/conversations');

// form data
export const createPost = (data: FormData) =>
  api.post("/post", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// form data
export const updatePost = (postId: string, data: FormData) =>
  api.put(`/post/${postId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Interceptors
let isRetry = false;
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === (401 || 503) && originalRequest && !isRetry) {
      isRetry = true;
      localStorage.clear();
      window.location.replace(PageURL.Login);
    }
    throw error;
  },
);

export default api;

// ******** API ****************

// let isRetry = false;
// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && originalRequest && !isRetry) {
//       isRetry = true;
//       try {
//         await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, {
//           withCredentials: true,
//         });
//         return api.request(originalRequest);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     throw error;
//   }
// );

// export default api;
