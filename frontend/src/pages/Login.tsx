import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(u, p);
      navigate('/boards');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" />
      <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Password" />
      <button type="submit">Log In</button>
      <p><Link to="/signup">Sign up instead</Link></p>
    </form>
  );
}
