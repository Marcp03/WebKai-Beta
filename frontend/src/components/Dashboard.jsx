import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/data';


const pillars = [
  { value: 'muertes', label: 'Muertes violentas' },
  { value: 'violencia', label: 'Violencia generalizada' },
  { value: 'desaparecidos', label: 'Personas desaparecidas' },
  { value: 'refugiados', label: 'Asistencia a personas refugiadas' },
];


const populations = [
  { value: '', label: 'Todas' },
  { value: 'general', label: 'General' },
  { value: 'mujeres', label: 'Mujeres' },
  { value: 'personas-lgbti', label: 'Personas LGBTI+' },
  { value: 'niños', label: 'Niños y Niñas' },
  { value: 'adultos-mayores', label: 'Adultos mayores' },
];


const violenceTypes = [
  { value: '', label: 'Todas' },
  { value: 'física', label: 'Violencia física' },
  { value: 'psicológica', label: 'Violencia psicológica' },
  { value: 'sexual', label: 'Violencia sexual' },
  { value: 'económica', label: 'Violencia económica' },
];


const regions = [
  { value: '', label: 'Todas' },
  { value: 'norte', label: 'Norte' },
  { value: 'centro', label: 'Centro' },
  { value: 'sur', label: 'Sur' },
  { value: 'oriente', label: 'Oriente' },
  { value: 'occidente', label: 'Occidente' },
];


const ages = [
  { value: '', label: 'Todas' },
  { value: '0-12', label: '0-12' },
  { value: '13-17', label: '13-17' },
  { value: '18-35', label: '18-35' },
  { value: '36-60', label: '36-60' },
  { value: '60+', label: '60+' },
];


function Dashboard() {
  const [filters, setFilters] = useState({
    pillar: 'muertes',
    year: '',
    population: '',
    violenceType: '',
    region: '',
    age: '',
  });
  const [years, setYears] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch available years for selected pillar to fill year options
  useEffect(() => {
    async function fetchYears() {
      try {
        setLoading(true);
        const res = await axios.get(API_URL, { params: { pillar: filters.pillar } });
        // Extract unique years
        const uniqueYears = Array.from(
          new Set(res.data.map(item => item.year))
        ).sort((a, b) => a - b);
        setYears(uniqueYears);


        // If current selected year not in list, reset
        if (!uniqueYears.includes(Number(filters.year))) {
          setFilters(prev => ({ ...prev, year: uniqueYears[0] || '' }));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }


    fetchYears();
  }, [filters.pillar]);


  // Fetch filtered data and prepare for chart
  useEffect(() => {
    async function fetchData() {
      if (!filters.year) return;
      try {
        setLoading(true);
        const res = await axios.get(API_URL, {
          params: {
            pillar: filters.pillar,
            year: filters.year,
            population: filters.population || undefined,
            violenceType: filters.violenceType || undefined,
            region: filters.region || undefined,
            age: filters.age || undefined,
          },
        });
        // Summarize values grouped by category: For simplicity show sum of values from returned items
        const totalValue = res.data.reduce((acc, cur) => acc + cur.value, 0);
        // Chart will show only one bar with total for selected year and filters
        setChartData([{ label: filters.year, value: totalValue }]);
      } catch (err) {
        console.error('Error fetching filtered data:', err);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filters]);


  function handleChange(e) {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }


  return (
    <div>
      <form className="flex flex-wrap gap-4 justify-center mb-8" aria-label="Filtros de estadísticas">
        <div>
          <label htmlFor="pillar" className="block font-semibold mb-1">Pilar:</label>
          <select
            id="pillar"
            name="pillar"
            value={filters.pillar}
            onChange={handleChange}
            className="rounded border border-neutralDark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          >
            {pillars.map(p => (<option key={p.value} value={p.value}>{p.label}</option>))}
          </select>
        </div>


        <div>
          <label htmlFor="year" className="block font-semibold mb-1">Año:</label>
          <select
            id="year"
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="rounded border border-neutralDark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
            aria-disabled={years.length === 0}
            disabled={years.length === 0}
          >
            {years.length === 0 && <option>Sin datos</option>}
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="population" className="block font-semibold mb-1">Población:</label>
          <select
            id="population"
            name="population"
            value={filters.population}
            onChange={handleChange}
            className="rounded border border-neutralDark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          >
            {populations.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="violenceType" className="block font-semibold mb-1">Tipo Violencia:</label>
          <select
            id="violenceType"
            name="violenceType"
            value={filters.violenceType}
            onChange={handleChange}
            className="rounded border border-neutralDark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          >
            {violenceTypes.map(v => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="region" className="block font-semibold mb-1">Región:</label>
          <select
            id="region"
            name="region"
            value={filters.region}
            onChange={handleChange}
            className="rounded border border-neutralDark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          >
            {regions.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>


        <div>
          <label htmlFor="age" className="block font-semibold mb-1">Edad:</label>
          <select
            id="age"
            name="age"
            value={filters.age}
            onChange={handleChange}
            className="rounded border border-neutralDark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5"
          >
            {ages.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
      </form>


      <div className="w-full h-96">
        {loading ? (
          <p className="text-center mt-24 text-neutralDark font-semibold">Cargando datos...</p>
        ) : chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={value => new Intl.NumberFormat().format(value)} />
              <Legend />
              <Bar dataKey="value" fill="#004972" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center mt-24 text-neutralDark font-semibold">No hay datos para los filtros seleccionados.</p>
        )}
      </div>
    </div>
  );
}


export default Dashboard;
