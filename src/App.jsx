import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import SingUp from "./pages/SingUp";
import UserLogout from "./pages/UserLogout";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;
  if (adminOnly && user.role !== 'Admin') return <Navigate to="/notes" />;
  return children;
};

const AdminDashboard = () => (
  <div className="max-w-2xl mx-auto mt-10 text-center">
    <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
    <p>Welcome, Admin! Here you can manage tenants and users.</p>
    <p>It is just for demo and show that you are admin.</p>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="/userlogout" element={<UserLogout />} />
          <Route path="/notes" element={<PrivateRoute><NotesPage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
