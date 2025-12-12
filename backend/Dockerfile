FROM python:3.12-slim

# Install deps OS opsional
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency list
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy source code + model
COPY . .

# Load env via docker-compose (env_file)
EXPOSE 8000

# Command menjalankan uvicorn
CMD ["sh", "-c", "uvicorn api:app --host $BACKEND_HOST --port $BACKEND_PORT"]