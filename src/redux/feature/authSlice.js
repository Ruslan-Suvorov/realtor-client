import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Congratulations ! ! !  You are fully registered!");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success(`Google-Login successfully ${result.email}`);
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getProfile(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "aueth/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(id, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: "",
    profile: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSignout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });

    // ==================================================
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });

    // ==================================================
    builder.addCase(googleSignIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(googleSignIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });

    // ==================================================
    builder.addCase(getProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });

    // ==================================================
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.profile = { ...state.profile, ...action.payload.result };
    });
  },
});

export const { setUser, setSignout } = authSlice.actions;

export default authSlice.reducer;
