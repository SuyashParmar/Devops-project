# ============================================
# Stage 1: Build the React frontend
# ============================================
FROM node:22-alpine AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ .
RUN npm run build

# ============================================
# Stage 2: Install backend production deps
# ============================================
FROM node:22-alpine AS backend-builder

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --only=production

# ============================================
# Stage 3: Final production image
# ============================================
FROM node:22-alpine

ENV NODE_ENV=production
ENV PORT=5001

WORKDIR /app

# Copy backend dependencies and source
COPY --from=backend-builder /app/server/node_modules ./node_modules
COPY server/src ./src
COPY server/package.json ./

# Copy frontend build into /app/public
COPY --from=frontend-builder /app/client/dist ./public

# Use non-root user for security
USER node

EXPOSE 5001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5001/api/health || exit 1

CMD ["node", "src/index.js"]
