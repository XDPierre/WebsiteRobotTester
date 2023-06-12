FROM node:16

# Set working directory
WORKDIR /app

# Copy code and package
COPY index.py .
COPY package.json .
COPY package-lock.json .

RUN npm install

# Define entry point
CMD ["node", "index.js"]
