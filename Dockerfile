# Use Node.js LTS as the base image
FROM node:20-alpine AS base

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application (env vars are embedded here)
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Create a non-root user and set permissions
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app will run on
EXPOSE 3000



# Start the application
CMD ["node", "server.js"]