# Use the official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker caching
COPY . .

# If package.json doesn't exist, generate it
RUN [ ! -f package.json ] && npm init -y

# Install dependencies (this will create package.json and package-lock.json if not present)
RUN npm install express axios

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["node", "index.js"]
