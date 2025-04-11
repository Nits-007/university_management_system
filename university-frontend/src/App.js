import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home';
import TableView from './pages/TableView';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import SignupPage from './components/SignUp';
import AllUserPage from './pages/AllUserPage';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <ToastContainer />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/table/:tableName" element={<TableView />} />
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/" element={<SignupPage />}></Route>
              <Route path="/DBA/users" element={<AllUserPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
