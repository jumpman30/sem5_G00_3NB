# Stage 1: Build the app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build the app
RUN npm run build

# Stage 2: Create a smaller image for production
FROM node:18

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/build ./build
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run","start:prod"]
