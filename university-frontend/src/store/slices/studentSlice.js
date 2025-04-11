import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentService } from '../../services/api';

// Async thunks for API calls
export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  'students/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await studentService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/create',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await studentService.create(studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/update',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await studentService.update(id, studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/delete',
  async (id, { rejectWithValue }) => {
    try {
      await studentService.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  students: [],
  currentStudent: null,
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch student by ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.students.findIndex(student => student.student_id === action.payload.student_id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        if (state.currentStudent && state.currentStudent.student_id === action.payload.student_id) {
          state.currentStudent = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(student => student.student_id !== action.payload);
        if (state.currentStudent && state.currentStudent.student_id === action.payload) {
          state.currentStudent = null;
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentStudent, clearError } = studentSlice.actions;
export default studentSlice.reducer; 