import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  token: null,
  isAuthenticated: false,
  auth: {}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    setProfileUser: (state, action) => {
      state.profile = action.payload.data;
      state.isAuthenticated = true;
    },

    logout: state => {
      state.profile = {};
      state.token = null;
    }
  }
});

export default authSlice;

export const {setAuthData, logout, setProfileUser} = authSlice.actions;
