# Usa una imagen base para Python
FROM python:3.11

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY backend/ ./backend/

# Instala dependencias si tienes un requirements.txt
RUN pip install -r backend/requirements.txt

# Expone el puerto
EXPOSE 8000

# Comando para correr el backend
CMD ["python", "backend/app.py"]
