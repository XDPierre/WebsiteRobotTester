FROM python:3

# Install dependencies
RUN apt-get update && apt-get install -y curl fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 \
    libcups2 libdbus-1-3 libdrm2 libgbm1 libgtk-3-0 libnspr4 libnss3 libu2f-udev libvulkan1 libxcomposite1 \
    libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils 

# Download and install Chrome
RUN curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o chrome.deb \
    && dpkg -i chrome.deb || apt-get -fy install \
    && rm chrome.deb

# Set working directory
WORKDIR /app

# Copy code
COPY index.py .

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Define entry point
CMD ["python", "index.py"]
