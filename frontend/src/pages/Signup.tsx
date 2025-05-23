import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { signup } = useAuth();
  const [u, setU] = useState(''); const [p, setP] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(u, p);
      navigate('/boards');
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Sign Up</h2>
      <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" />
      <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Password" />
      <button type="submit">Create Account</button>
      <p><Link to="/login">Already have an account?</Link></p>
    </form>
  );
}
