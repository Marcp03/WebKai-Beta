import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Setup axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);


  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setIsLoggedIn(true);
  };


  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };


  return (
    <div className="min-h-screen bg-neutralLight text-neutralDark font-sans">
      <header className="bg-primary text-neutralLight sticky top-0 z-50 shadow-md user-select-none">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-extrabold tracking-wide">Observatorio KAI+</h1>
          <nav className="space-x-4 hidden md:block" aria-label="Principal navegación">
            <a href="#inicio" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Inicio</a>
            <a href="#sobre" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Sobre</a>
            <a href="#metodologia" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Metodología</a>
            <a href="#pilares" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Cuatro pilares</a>
            <a href="#estadisticas" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Estadísticas</a>
            <a href="#publicaciones" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Publicaciones</a>
            <a href="#contacto" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Contacto</a>
            <a href="#area-privada" className="hover:text-accent5 focus:outline-accent5 focus:text-accent5">Área privada</a>
          </nav>
          <button
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            aria-label="Ir arriba"
            className="md:hidden text-neutralLight hover:text-accent5 focus:outline-accent5 focus:text-accent5"
          >
            ↑
          </button>
        </div>
      </header>


      <main className="max-w-6xl mx-auto px-4 py-8 space-y-16" aria-live="polite">
        <section id="inicio" tabIndex="-1" aria-label="Inicio">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4">Inicio</h2>
          <p className="text-lg leading-relaxed text-neutralDark max-w-3xl mx-auto text-center">
            Bienvenidos a la plataforma digital del <strong>Observatorio KAI+</strong>, un espacio de análisis y visibilización de la violencia, desapariciones, y asistencia humanitaria.
          </p>
        </section>


        <section id="sobre" tabIndex="-1" aria-label="Sobre el Observatorio">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4">Sobre el Observatorio</h2>
          <p className="text-base max-w-3xl mx-auto leading-relaxed">
            El Observatorio KAI+ es una iniciativa comprometida con la recolección, análisis y difusión rigurosa y transparente de datos relacionados con violencia y situaciones vulnerables.
          </p>
        </section>


        <section id="metodologia" tabIndex="-1" aria-label="Metodología y fuentes">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4">Metodología y fuentes</h2>
          <ul className="max-w-3xl mx-auto list-disc list-inside space-y-1">
            <li>Datos obtenidos de fuentes oficiales y organizaciones aliadas.</li>
            <li>Análisis realizado por expertos en derechos humanos y estadística.</li>
            <li>Revisión constante de la calidad y veracidad de la información.</li>
            <li>Aplicación de protocolos internacionales para el trabajo con información sensible.</li>
          </ul>
        </section>


        <section id="pilares" tabIndex="-1" aria-label="Cuatro pilares">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-8 text-center">Cuatro pilares del Observatorio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <article className="bg-white rounded-lg shadow-md p-6 focus:ring-accent5 focus:ring-4 focus:outline-none" tabIndex="0" aria-describedby="desc-muertes">
              <h3 className="text-xl font-semibold text-primary mb-2">Muertes violentas</h3>
              <p id="desc-muertes">Registro y análisis de muertes causadas por violencia para visibilizar su impacto social.</p>
            </article>


            <article className="bg-white rounded-lg shadow-md p-6 focus:ring-accent5 focus:ring-4 focus:outline-none" tabIndex="0" aria-describedby="desc-violencia">
              <h3 className="text-xl font-semibold text-primary mb-2">Violencia generalizada</h3>
              <p id="desc-violencia">Estudio de diversas formas de violencia que afectan a la población facilitando la comprensión contextual.</p>
            </article>


            <article className="bg-white rounded-lg shadow-md p-6 focus:ring-accent5 focus:ring-4 focus:outline-none" tabIndex="0" aria-describedby="desc-desaparecidos">
              <h3 className="text-xl font-semibold text-primary mb-2">Personas desaparecidas</h3>
              <p id="desc-desaparecidos">Documentación y monitoreo de casos de personas desaparecidas para promover búsqueda y justicia.</p>
            </article>


            <article className="bg-white rounded-lg shadow-md p-6 focus:ring-accent5 focus:ring-4 focus:outline-none" tabIndex="0" aria-describedby="desc-refugiados">
              <h3 className="text-xl font-semibold text-primary mb-2">Asistencia a personas refugiadas</h3>
              <p id="desc-refugiados">Seguimiento a la atención y apoyo brindado a personas refugiadas y migrantes en situación de vulnerabilidad.</p>
            </article>
          </div>
        </section>


        <section id="estadisticas" tabIndex="-1" aria-label="Estadísticas y visualizaciones">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4 text-center">Estadísticas y visualizaciones</h2>
          <Dashboard />
        </section>


        <section id="publicaciones" tabIndex="-1" aria-label="Publicaciones">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4">Publicaciones</h2>
          <ul className="max-w-3xl mx-auto list-disc list-inside space-y-2">
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline focus:outline-accent5">Boletín de abril 2024</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline focus:outline-accent5">Informe anual 2023 - Violencia Generalizada</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline focus:outline-accent5">Reporte especial - Personas desaparecidas</a></li>
          </ul>
        </section>


        <section id="contacto" tabIndex="-1" aria-label="Contacto y denuncias">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4">Contacto y denuncias</h2>
          <form id="contact-form" aria-describedby="contact-desc" className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-5" noValidate onSubmit={e => e.preventDefault()}>
            <p id="contact-desc" className="text-neutralDark">
              Puede enviar denuncias o consultas usando este formulario. Respetamos su privacidad y seguridad.
            </p>
            <div>
              <label htmlFor="contact-name" className="block mb-1 font-semibold">Nombre</label>
              <input type="text" id="contact-name" name="contact-name" autoComplete="name" required aria-required="true"
                className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5" />
            </div>
            <div>
              <label htmlFor="contact-email" className="block mb-1 font-semibold">Correo electrónico</label>
              <input type="email" id="contact-email" name="contact-email" autoComplete="email" required aria-required="true"
                className="w-full border border-neutralDark rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent5" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block mb-1 font-semibold">Mensaje / Denuncia</label>
              <textarea id="contact-message" name="contact-message" required aria-required="true" rows="4"
                className="w-full border border-neutralDark rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-accent5"></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-neutralLight font-bold rounded-md py-2 hover:bg-accent5 focus:outline-none focus:ring-4 focus:ring-accent5"
            >Enviar</button>
          </form>
        </section>


        <section id="area-privada" tabIndex="-1" aria-label="Área privada de carga de datos">
          <h2 className="text-3xl font-bold text-primary border-b-4 border-accent3 pb-1 mb-4">Área privada de carga de datos</h2>
          {isLoggedIn ? (
            <AdminPanel onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </section>
      </main>


      <footer className="bg-neutralDark text-neutralLight text-center py-4 select-none">
        Observatorio KAI+ &bull; Fuente pública, seria y verificable &bull; &copy; 2024
      </footer>
    </div>
  );
}


export default App;
