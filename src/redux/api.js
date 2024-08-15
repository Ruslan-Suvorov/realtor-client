import axios from "axios";

const API = axios.create({
  baseURL: "https://realtor-server-v8if.onrender.com",
  // baseURL: "http://localhost:4000", // dev
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// user API =========================================
export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
export const googleSignIn = (result) => API.post("/auth/google-signin", result);
export const getProfile = (id) => API.get(`/auth/profile/${id}`);
export const updateUser = (id, user) =>
  API.patch(`/auth/update-user/${id}`, user);

// advert API =======================================
export const createAdvert = (result) =>
  API.post("/advert/create-advert", result);
export const getAdverts = (page, search, tag) =>
  API.get(`/advert/?page=${page}&search=${search}&tag=${tag}`);
export const getAdvert = (id) => API.get(`/advert/${id}`);
export const getAdvertsByUser = (userId) =>
  API.get(`/advert/dashboard/${userId}`);
export const updateAdvert = (id, updatedAdvertData) =>
  API.patch(`/advert/edit-advert/${id}`, updatedAdvertData);
export const deleteAdvert = (id) => API.delete(`/advert/delete-advert/${id}`);
export const likeAdvert = (id) => API.patch(`/advert/like/${id}`);

// comment API ======================================
export const createComment = (comment) =>
  API.post("/comment/create-comment", comment);
export const getComments = (id) => API.get(`/comment/comments/${id}`);
export const editComment = (id, comment) =>
  API.patch(`/comment/edit-comment/${id}`, comment);
export const deleteComment = (id) =>
  API.delete(`/comment/delete-comment/${id}`);
export const deleteReply = (id, commentId) =>
  API.patch(`/comment/delete-reply/${id}`, commentId);
