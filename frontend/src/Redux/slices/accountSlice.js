import { createSlice } from '@reduxjs/toolkit';

// const account = JSON.parse(localStorage.getItem('account'));

const initialState = {
  isAuthenticated: false,
  state: {
    isFetching: true,
  },
  account: {
    account: ' ',
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setIsFetching: state => {
      state.state.isFetching = true;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsFetching,setIsAuthenticated } = accountSlice.actions;

export default accountSlice.reducer;