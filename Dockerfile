# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
# Build the Vite application
RUN npm run build

# Stage 2: Serve the application using a lightweight web server
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
# If you have custom configurations for single-page applications
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
