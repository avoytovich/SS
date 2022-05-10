import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.profile = action.payload;
      state.token = action.payload.role;
    },
    LOGOUT: state => {
      state.profile = {};
      state.token = null;
    },
  },
});

const { actions } = authSlice;

export const loginByToken =
  ({ data }) =>
  dispatch => {
    dispatch(actions.LOGIN(data));
  };

export const logOut = () => dispatch => {
  dispatch(actions.LOGOUT());
};

export default authSlice;
