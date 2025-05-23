import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Boards from './pages/Boards';
import Signup from "./pages/Signup.tsx";
import BoardDetail from './pages/BoardDetail';
import './App.css'

function App() {
  const isAuthenticated = false;

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
                <Route
                  path="/boards"
                  element={
                    isAuthenticated
                      ? <Boards />
                      : <Navigate to="/login" replace />
                  }
                />
            <Route path="/signup" element={<Signup />} />

                <Route
                  path="/boards/:boardId"
                  element={
                    isAuthenticated
                      ? <BoardDetail />
                      : <Navigate to="/login" replace />
                  }
                />
            {/* Redirect any unknown URL to /boards */}
            <Route path="*" element={<Navigate to="/boards" replace />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
