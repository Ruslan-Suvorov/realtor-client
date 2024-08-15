import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ comment }, { rejectWithValue }) => {
    try {
      const response = await api.createComment(comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getComments(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await api.editComment(id, comment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteComment(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReply = createAsyncThunk(
  "comment/deleteReply",
  async ({ id, commentId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteReply(id, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state, action) => {});
    builder.addCase(createComment.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      const {
        arg: {
          comment: { commentId },
        },
      } = action.meta;
      if (commentId) {
        state.comments = state.comments.map((comment) =>
          comment._id === commentId ? action.payload : comment
        );
      } else {
        state.comments = [action.payload, ...state.comments];
      }
    });

    // ==========================================================
    builder.addCase(getComments.pending, (state, action) => {});
    builder.addCase(getComments.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });

    // ==========================================================
    builder.addCase(editComment.pending, (state, action) => {});
    builder.addCase(editComment.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      const {
        arg: {
          id,
          comment: { commentId },
        },
      } = action.meta;
      if (commentId) {
        state.comments = state.comments.map((comment) =>
          comment._id === commentId ? action.payload : comment
        );
      }
      if (id) {
        state.comments = state.comments.map((comment) =>
          comment._id === id ? action.payload : comment
        );
      }
    });

    // ==========================================================
    builder.addCase(deleteComment.pending, (state, action) => {});
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const { arg } = action.meta;
      if (arg) {
        state.comments = state.comments.filter(
          (comment) => comment._id !== arg.id
        );
      }
    });

    // ==========================================================
    builder.addCase(deleteReply.pending, (state, action) => {});
    builder.addCase(deleteReply.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(deleteReply.fulfilled, (state, action) => {
      const {
        arg: {
          commentId: { id },
        },
      } = action.meta;
      if (id) {
        state.comments = state.comments.map((comment) =>
          comment._id === id ? action.payload : comment
        );
      }
    });
  },
});

export default commentSlice.reducer;
