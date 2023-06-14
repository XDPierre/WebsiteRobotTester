# Use a base image with Node.js and Chrome
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the JavaScript code to the container
COPY . /app

# Install dependencies
RUN npm install

# Set the entry point command
CMD ["node", "index.js"]