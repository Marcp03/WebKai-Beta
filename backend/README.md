# Observatorio KAI+ Backend
&nbsp;
&nbsp;

## Instalación
1. Clonar repo y entrar a `/backend`
2. Copiar `.env.example` a `.env`, configurar variables de entorno para la base de datos y JWT_SECRET
3. Ejecutar `npm install`
4. Inicializar base de datos con tabla `pillar_data`:
&nbsp;
&nbsp;

```sql
CREATE TABLE pillar_data (
  id SERIAL PRIMARY KEY,
  pillar VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  population VARCHAR(50) NOT NULL,
  violence_type VARCHAR(50) NOT NULL,
  region VARCHAR(50) NOT NULL,
  age VARCHAR(20) NOT NULL,
  value INTEGER NOT NULL
);
&nbsp;
&nbsp;

-- Opcional: tabla usuarios para producción con hashed passwords.
&nbsp;
&nbsp;
&nbsp;
&nbsp;

---
&nbsp;
&nbsp;

### FRONTEND
&nbsp;
&nbsp;

`frontend/package.json`
```json
{
  "name": "observatorio-kai-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "recharts": "^2.6.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2",
    "vite": "^4.3.9"
  }
}