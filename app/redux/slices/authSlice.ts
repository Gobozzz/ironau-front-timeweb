import api from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { closeModal } from "./loginModalSlice";

export interface AuthState {
  user: {
    id: number;
    name: string;
    email: string;
    rules: string[] | null;
    status: string;
    status_name: string;
  } | null;
  isLoading: boolean;
  errorsLogin: ServerErrors;
  errorsRegister: ServerErrors;
  canRedirectedProfile: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  errorsLogin: {},
  errorsRegister: {},
  canRedirectedProfile: false,
};

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/login", data);
      dispatch(closeModal());
      return response.data.user;
    } catch (err: any) {
      let errors;
      if (err.response?.data?.errors) {
        errors = err.response.data.errors;
      } else {
        errors = { message: ["Произошла ошибка при входе"] };
      }
      return rejectWithValue(errors);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post("/register", data);
      dispatch(closeModal());
      return response.data.user;
    } catch (err: any) {
      let errors;
      if (err.response?.data?.errors) {
        errors = err.response.data.errors;
      } else {
        errors = { message: ["Произошла ошибка при регистрации"] };
      }
      return rejectWithValue(errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/logout");
});

export const refresh = createAsyncThunk("auth/refresh", async () => {
  const response = await api.get("/user");
  return response.data.data;
});

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutMemory: (state) => {
      state.user = null;
      state.isLoading = false;
      state.errorsLogin = {};
      state.errorsRegister = {};
    },
    notRedirectingProfile: (state) => {
      state.canRedirectedProfile = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Логин
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = action.payload;
        state.canRedirectedProfile = true;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.user = null;
        state.isLoading = false;
        state.errorsLogin = action.payload;
      })
      // Регистрация
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = action.payload;
        state.canRedirectedProfile = true;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.user = null;
        state.isLoading = false;
        state.errorsRegister = action.payload;
      })
      // Обновление
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = action.payload;
      })
      .addCase(refresh.rejected, (state, action: any) => {
        state.user = null;
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
      })
      // Выход
      .addCase(logout.pending, (state) => {
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.errorsLogin = {};
        state.errorsRegister = {};
        state.user = null;
      });
  },
});

export const { logoutMemory, notRedirectingProfile } = counterSlice.actions;

export default counterSlice.reducer;
