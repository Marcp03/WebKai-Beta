import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/data';


const pillars = [
  { value: 'muertes', label: 'Muertes violentas' },
  { value: 'violencia', label: 'Violencia generalizada' },
  { value: 'desaparecidos', label: 'Personas desaparecidas' },
  { value: 'refugiados', label: 'Asistencia a personas refugiadas' },
];


const populations = [
  { value: 'general', label: 'General' },
  { value: 'mujeres', label: 'Mujeres' },
  { value: 'personas-lgbti', label: 'Personas LGBTI+' },
  { value: 'niños', label: 'Niños y Niñas' },
  { value: 'adultos-mayores', label: 'Adultos mayores' },
];


const violenceTypes = [
  { value: 'física', label: 'Violencia física' },
  { value: 'psicológica', label: 'Violencia psicológica' },
  { value: 'sexual', label: 'Violencia sexual' },
  { value: 'económica', label: 'Violencia económica' },
];


const regions = [
  { value: 'norte', label: 'Norte' },
  { value: 'centro', label: 'Centro' },
  { value: 'sur', label: 'Sur' },
  { value: 'oriente', label: 'Oriente' },
  { value: 'occidente', label: 'Occidente' },
];


const ages = [
  { value: '0-12', label: '0-12' },
  { value: '13-17', label: '13-17' },
  { value: '18-35', label: '18-35' },
  { value: '36-60', label: '36-60' },
  { value: '60+', label: '60+' },
];


function AdminPanel({ onLogout }) {
  const [formData, setFormData] = useState({
    pillar: '',
    year: new Date().getFullYear(),
    population: '',
    violenceType: '',
    region: '',
    age: '',
    value: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');


    const { pillar, year, population, violenceType, region, age, value } = formData;


    // Validate inputs
    if (
      !pillar || !year || !population || !violenceType || !region || !age || value === ''
    ) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    if (isNaN(Number(value)) || Number(value) < 0) {
      setError('El valor debe ser un número mayor o igual a 0.');
      return;
    }


    try {
      const res = await axios.post(API_URL, {
        pillar,
        year: Number(year),
        population,
        violenceType,
        region,
        age,
        value: Number(value),
      });
      setMessage(res.data.message || 'Dato guardado correctamente');
      setFormData(prev => ({
        ...prev,
        value: '',
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error guardando datos');
    }
  }


  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
      <form onSubmit={handleSubmit} aria-label="Formulario para cargar datos">
        <div className="mb-4">
          <label htmlFor="pillar" className="block font-semibold mb-1">Pilar</label>
          <select
            id="pillar"
            name="pillar"
            value={formData.pillar}
            onChange={handleChange}
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
            required
          >
            <option value="" disabled>Seleccione un pilar</option>
            {pillars.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="year" className="block font-semibold mb-1">Año</label>
          <input
            type="number"
            id="year"
            name="year"
            min="2000"
            max="2100"
            value={formData.year}
            onChange={handleChange}
            required
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="population" className="block font-semibold mb-1">Población</label>
          <select
            id="population"
            name="population"
            value={formData.population}
            onChange={handleChange}
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
            required
          >
            <option value="" disabled>Seleccione población</option>
            {populations.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="violenceType" className="block font-semibold mb-1">Tipo de violencia</label>
          <select
            id="violenceType"
            name="violenceType"
            value={formData.violenceType}
            onChange={handleChange}
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
            required
          >
            <option value="" disabled>Seleccione tipo de violencia</option>
            {violenceTypes.map(v => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="region" className="block font-semibold mb-1">Región</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
            required
          >
            <option value="" disabled>Seleccione región</option>
            {regions.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="age" className="block font-semibold mb-1">Edad</label>
          <select
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
            required
          >
            <option value="" disabled>Seleccione rango de edad</option>
            {ages.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label htmlFor="value" className="block font-semibold mb-1">Valor</label>
          <input
            type="number"
            id="value"
            name="value"
            min="0"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          />
        </div>


        {message && <p className="text-green-700 font-semibold mb-4">{message}</p>}
        {error && <p className="text-red-700 font-semibold mb-4">{error}</p>}


        <button
          type="submit"
          className="w-full bg-primary text-neutralLight font-bold py-2 rounded-md hover:bg-accent5 focus:outline-none focus:ring-4 focus:ring-accent5"
        >
          Guardar dato
        </button>
      </form>


      <button
        onClick={onLogout}
        className="mt-6 w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-700"
      >
        Cerrar sesión
      </button>
    </div>
  );
}


export default AdminPanel;
