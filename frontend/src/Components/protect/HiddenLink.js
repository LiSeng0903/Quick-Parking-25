import { useSelector } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

const account = JSON.parse(localStorage.getItem('account'));

const initialState = {
  isLoggedIn: false,
  account: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});
export const { SET_LOGIN } = authSlice.actions;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <> {children}</>;
  }
  return null;
};
