import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user', passkey: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert("Registration successful");
      navigate('/login');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Create an Account</h2>
        <Input label="Name" name="name" onChange={handleChange} />
        <Input label="Email" name="email" onChange={handleChange} />
        <Input label="Password" name="password" type="password" onChange={handleChange} />
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <select name="role" onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {form.role === 'admin' && (
          <Input label="Admin Passkey" name="passkey" onChange={handleChange} />
        )}
        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
