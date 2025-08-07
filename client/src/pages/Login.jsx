import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert("Login successful");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-600">Login</h2>
        <Input label="Email" name="email" onChange={handleChange} />
        <Input label="Password" name="password" type="password" onChange={handleChange} />
        <button type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="/" className="text-green-600 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
