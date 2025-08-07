import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
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

  const handleUpload = async () => {
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/excel/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      setStatus(res.data.msg);
    } catch (err) {
      setStatus(err.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-gray-700 font-medium">Role: {user.role.toUpperCase()}</span>
          )}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl text-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Upload Excel File</h2>

          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Upload
          </button>

          {status && (
            <p className="mt-4 text-green-600 font-medium">{status}</p>
          )}
        </div>
      </main>

      {/* Optional Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        &copy; {new Date().getFullYear()} MERN Auth Dashboard
      </footer>
    </div>
  );
};

export default Dashboard;
