import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // await logout();
    navigate('/userlogout');
  };

  return (
    <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-6">
        <Link to="/notes" className="text-lg font-semibold text-purple-700 hover:underline">Notes</Link>
        {user && user.role === 'Admin' && (
          <Link to="/admin" className="text-lg font-semibold text-blue-700 hover:underline">Admin</Link>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/" className="text-gray-700 hover:underline">Login</Link>
            <Link to="/singup" className="text-gray-700 hover:underline">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
