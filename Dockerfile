# Use Node.js LTS as the base image
FROM node:20-alpine AS base

# Install dependencies needed for building (libc compatibility)
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (production + dev needed for build)
RUN npm ci

# Build the application
FROM base AS builder

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN npm run build

# Production image
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]