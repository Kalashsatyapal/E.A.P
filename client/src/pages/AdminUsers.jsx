import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  }, [refresh]);

  const handleRoleChange = (userId, newRole) => {
    axios.put('http://localhost:5000/api/admin/update-role', {
      userId, newRole
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => setRefresh(prev => !prev));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-gray-800 p-6">
      <h2 className="text-4xl font-bold mb-8 text-center tracking-tight text-gray-700">🛠️ Admin User Management</h2>
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-lg bg-white border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase tracking-wider">
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Role</th>
                <th className="py-4 px-6 text-left">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6 text-gray-500">{user.email}</td>
                  <td className="py-4 px-6 font-semibold text-indigo-600">{user.role}</td>
                  <td className="py-4 px-6">
                    <select
                      className="bg-white text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
