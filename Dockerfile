# Stage 1: Build the static site
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate static site
RUN npm run generate

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
