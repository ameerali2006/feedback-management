import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!name||!email||!password){
      alert('complate all columbs')
      return
    }
    await axios.post('http://localhost:3000/api/register', { name, email, password, role });
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border" placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border" placeholder="Password" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border">
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;