# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /admin

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./


# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on

EXPOSE 5173
# Start
CMD ["npx", "vite", "preview", "--port", "5173","--host"]