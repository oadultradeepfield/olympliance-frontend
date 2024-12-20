import { UserInfo } from "../data/userData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    reputation: 0,
    role_id: 0,
    user_id: 0,
    username: "",
    is_banned: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; user: UserInfo }>,
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        reputation: 0,
        role_id: 0,
        user_id: 0,
        username: "",
        is_banned: false,
      };
    },
  },
});

export const { setAuthState, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
