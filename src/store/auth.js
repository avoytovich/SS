import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

export const {login, logout} = authSlice.actions;
