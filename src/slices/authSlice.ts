import { UserInfo } from "../data/userData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isUserDataLoaded: boolean;
  user: UserInfo;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isUserDataLoaded: false,
  user: {
    reputation: 0,
    role_id: 0,
    user_id: 0,
    username: "",
    is_banned: false,
    is_deleted: false,
    created_at: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        user?: UserInfo;
      }>,
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    setUserDataLoaded: (state, action: PayloadAction<boolean>) => {
      state.isUserDataLoaded = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        reputation: 0,
        role_id: 0,
        user_id: 0,
        username: "",
        is_banned: false,
        is_deleted: false,
        created_at: null,
      };
      state.isUserDataLoaded = false;
    },
  },
});

export const { setAuthState, setUser, setUserDataLoaded, logout } =
  authSlice.actions;
export default authSlice.reducer;
