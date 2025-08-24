# Use Node.js Alpine image for smaller size
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port that Next.js runs on
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"]
