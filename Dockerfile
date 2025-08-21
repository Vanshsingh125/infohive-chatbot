# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for both client and server
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for both client and server
RUN npm install --prefix ./client
RUN npm install --prefix ./server

# Copy source code for both client and server
COPY client/ ./client/
COPY server/ ./server/

# Build the client
RUN npm run build --prefix ./client

# Set working directory to server
WORKDIR /app/server

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
