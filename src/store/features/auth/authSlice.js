import { createAction, createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};
// const pending = createAction("pending");
// const fulfilled = createAction("fulfilled");
// const rejected = createAction("rejected");

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .userLogin(pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .userLogin(fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.userInfo = payload;
  //       state.userToken = payload.userToken;
  //     })
  //     .userLogin(rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //     });
  // },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.user_token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user reducer...
  },
});

export default authSlice.reducer;
