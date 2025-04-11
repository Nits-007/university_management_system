import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null
};

const jobOffersSlice = createSlice({
  name: 'jobOffers',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setItems, setSelectedItem, setLoading, setError } = jobOffersSlice.actions;
export default jobOffersSlice.reducer; 