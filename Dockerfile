# Base image
FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Copy prisma files
COPY prisma/ ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Generate .env file from .env.example if it not exists
RUN npm run env

# Copy the .env file
COPY .env ./

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3333

# Start the server using the production build
CMD ["npm", "run", "start:prod"]