
# Stage 1: Build
FROM node:25-slim AS base
ENV DIR=/app
WORKDIR $DIR

# Install dependencies separately to leverage layer caching
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Final Image
FROM node:25-slim
WORKDIR /app
ENV NODE_ENV=production

# Copy only production artifacts and node_modules from base
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Use a non-root user for security
USER node

EXPOSE 8080
CMD [ "npm", "start" ]
