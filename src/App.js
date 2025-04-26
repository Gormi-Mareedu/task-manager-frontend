// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/tasks" /> : <Login />}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/tasks" /> : <Register />}
        />
        <Route
          path="/tasks"
          element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />}
        />
        {/* Redirects to login or tasks page depending on authentication */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
