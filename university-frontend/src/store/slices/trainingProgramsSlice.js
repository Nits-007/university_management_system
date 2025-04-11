import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null
};

const trainingProgramsSlice = createSlice({
  name: 'trainingPrograms',
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

export const { setItems, setSelectedItem, setLoading, setError } = trainingProgramsSlice.actions;
export default trainingProgramsSlice.reducer; 