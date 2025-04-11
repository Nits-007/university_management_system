import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { universityApi } from './api/universityApi';
import authReducer from './slices/authSlice';
import managementReducer from './slices/managementSlice';
import professorReducer from './slices/professorSlice';
import departmentReducer from './slices/departmentSlice';
import studentReducer from './slices/studentSlice';
import hostelReducer from './slices/hostelSlice';
import libraryReducer from './slices/librarySlice';
import booksReducer from './slices/booksSlice';
import sportsReducer from './slices/sportsSlice';
import trainingPlacementReducer from './slices/trainingPlacementSlice';
import companiesReducer from './slices/companiesSlice';
import jobOffersReducer from './slices/jobOffersSlice';
import internshipsReducer from './slices/internshipsSlice';
import trainingProgramsReducer from './slices/trainingProgramsSlice';
import { authApi } from './api/AuthApi';


export const store = configureStore({
  reducer: {
    [universityApi.reducerPath]: universityApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    management: managementReducer,
    professor: professorReducer,
    department: departmentReducer,
    student: studentReducer,
    hostel: hostelReducer,
    library: libraryReducer,
    books: booksReducer,
    sports: sportsReducer,
    trainingPlacement: trainingPlacementReducer,
    companies: companiesReducer,
    jobOffers: jobOffersReducer,
    internships: internshipsReducer,
    trainingPrograms: trainingProgramsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([universityApi.middleware,authApi.middleware]),
});

setupListeners(store.dispatch); 