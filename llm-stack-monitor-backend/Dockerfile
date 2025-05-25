# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y gcc
# Copy requirements file from correct path
COPY backend/requirements.txt ./

# Install Python dependencies
RUN pip install --no-cache-dir -r ./requirements.txt

# Copy the entire backend source code
COPY backend/ ./

# Expose FastAPI port
EXPOSE 8000

# Command to run FastAPI using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
