import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decode = JSON.parse(atob(token.split('.')[1]));
    setUser(decode);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Welcome to Dashboard</h1>
        {user && (
          <p className="text-lg mb-6">Logged in as <span className="font-semibold">{user.role.toUpperCase()}</span></p>
        )}
        <button onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
