import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createAdvert = createAsyncThunk(
  "advert/createAdvert",
  async ({ advertData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createAdvert(advertData);
      toast.success("Advert has been created");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdvert = createAsyncThunk(
  "advert/getAdvert",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getAdvert(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAdvert = createAsyncThunk(
  "advert/deleteAdvert",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteAdvert(id);
      toast.success("Advert deleted successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAdvert = createAsyncThunk(
  "advert/updateAdvert",
  async ({ id, updatedAdvertData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateAdvert(id, updatedAdvertData);
      toast.success("Advert updated successfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeAdvert = createAsyncThunk(
  "advert/likeAdvert",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.likeAdvert(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdverts = createAsyncThunk(
  "advert/getAdverts",
  async ({ page, search, tag }, { rejectWithValue }) => {
    try {
      const response = await api.getAdverts(page, search, tag);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdvertsByUser = createAsyncThunk(
  "advert/getAdvertsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getAdvertsByUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const advertSlice = createSlice({
  name: "advert",
  initialState: {
    page: 1,
    tag: "",
    numberOfPages: null,
    adverts: [],
    advert: null,
    userAdverts: [],
    loading: false,
    error: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAdvert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createAdvert.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(createAdvert.fulfilled, (state, action) => {
      state.loading = false;
      state.adverts = [action.payload];
    });
    //===============================================
    builder.addCase(getAdvert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdvert.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getAdvert.fulfilled, (state, action) => {
      state.loading = false;
      state.advert = action.payload;
    });
    //===============================================
    builder.addCase(deleteAdvert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAdvert.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deleteAdvert.fulfilled, (state, action) => {
      state.loading = false;
      const { arg } = action.meta;
      if (arg) {
        state.userAdverts = state.userAdverts.filter((ad) => ad._id !== arg.id);
      }
    });
    //===============================================
    builder.addCase(updateAdvert.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAdvert.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateAdvert.fulfilled, (state, action) => {
      state.loading = false;
      const { arg } = action.meta;
      if (arg) {
        state.userAdverts = state.userAdverts.map((ad) =>
          ad._id === arg.id ? action.payload : ad
        );
      }
    });
    //===============================================
    builder.addCase(likeAdvert.pending, (state, action) => {});
    builder.addCase(likeAdvert.rejected, (state, action) => {
      state.error = action.payload.message;
    });
    builder.addCase(likeAdvert.fulfilled, (state, action) => {
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.adverts = state.adverts.map((advert) =>
          advert._id === id ? action.payload : advert
        );
      }
    });
    //===============================================
    builder.addCase(getAdverts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdverts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getAdverts.fulfilled, (state, action) => {
      state.loading = false;
      state.page = action.payload.page;
      state.adverts = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
    });
    //===============================================
    builder.addCase(getAdvertsByUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdvertsByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getAdvertsByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userAdverts = action.payload;
    });
  },
});

export const { setPage, setTag } = advertSlice.actions;
export default advertSlice.reducer;
