import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.profile = action.payload;
    },
    login: (state, {payload: {data}}) => {
      state.profile = data;
      state.token = data.role;
    },
    logout: state => {
      state.profile = {};
      state.token = null;
    }
  }
});

export default authSlice;

export const {login, logout, setAuthUser} = authSlice.actions;
