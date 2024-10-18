# Use the official Node.js image for building the frontend
FROM node:14 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a web server to serve the build files
FROM nginx:alpine

# Copy built files from the previous build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Command to run the NGINX server
CMD ["nginx", "-g", "daemon off;"]
