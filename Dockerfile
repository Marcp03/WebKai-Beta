FROM python:3.11

WORKDIR /app

COPY backend/ ./backend/

# Solo intenta instalar si el archivo existe
RUN test -f backend/requirements.txt && pip install -r backend/requirements.txt || echo "No requirements.txt found, skipping..."

EXPOSE 8000

CMD ["python", "backend/app.py"]
