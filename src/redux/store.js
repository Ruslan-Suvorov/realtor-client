import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./feature/authSlice";
import AdvertReducer from "./feature/advertSlice";
import CommentReducer from "./feature/commentSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    advert: AdvertReducer,
    comment: CommentReducer,
  },
});
