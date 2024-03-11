# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port that React will run on
# EXPOSE 3000

# Command to run on container start
CMD ["npm", "run", "build"]