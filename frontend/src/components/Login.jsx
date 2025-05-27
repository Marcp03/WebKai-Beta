import React, { useState } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/auth/login';


function Login({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(API_URL, { username, password });
      if (res.data.token) {
        onLogin(res.data.token);
      } else {
        setError('Error inesperado de autenticación');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error en inicio de sesión');
    }
  }


  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      <h3 className="text-xl font-bold text-primary text-center">Ingreso Administrativo</h3>
      <div>
        <label htmlFor="username" className="block font-semibold mb-1">Usuario</label>
        <input
          type="text"
          id="username"
          value={username}
          readOnly
          className="w-full border border-neutralDark px-3 py-2 rounded-md bg-neutralLight cursor-not-allowed text-gray-500"
          aria-disabled="true"
        />
        <small className="text-gray-500">El usuario está predefinido como "admin"</small>
      </div>
      <div>
        <label htmlFor="password" className="block font-semibold mb-1">Contraseña</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-neutralDark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent5"
          required
          aria-required="true"
          aria-describedby="error-msg"
        />
      </div>
      {error && <p id="error-msg" role="alert" className="text-red-600 font-semibold">{error}</p>}
      <button
        type="submit"
        className="w-full bg-primary text-neutralLight font-bold py-2 rounded-md hover:bg-accent5 focus:outline-none focus:ring-4 focus:ring-accent5"
      >
        Ingresar
      </button>
    </form>
  );
}


export default Login;
