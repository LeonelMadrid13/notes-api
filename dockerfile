# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY pnpm-lock.yaml* package.json ./
RUN pnpm approve-builds
RUN pnpm install

# Copy rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose your app port
EXPOSE 1010

# Start the app
CMD ["pnpm", "start"]
