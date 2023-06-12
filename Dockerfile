FROM python:3

# Set working directory
WORKDIR /app

# Copy code
COPY index.py .


# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Define entry point
CMD ["python", "index.py"]
