import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  token: null,
  isAuthenticated: false,
  auth: {},
  profilePhoto: ''
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

    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },

    logout: state => {
      state.profile = {};
      state.token = null;
    }
  }
});

export default authSlice;

export const {setAuthData, logout, setProfileUser, setProfilePhoto} = authSlice.actions;
