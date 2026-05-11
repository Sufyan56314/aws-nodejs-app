# Use a light version of Node 22
FROM node:22-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]