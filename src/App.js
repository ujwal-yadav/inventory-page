import './App.css';
import { ThemeProvider } from '@mui/material';
import { Theme } from './theme';
import Login from './containers/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './containers/Dashboard/Dashboard';
import AuthProvider from './context/AuthProvider';
import ProtectedRoute from './layouts/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
