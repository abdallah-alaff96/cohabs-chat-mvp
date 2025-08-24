# 🐳 Docker Usage Guide

This guide shows how to run the Cohabs Chat MVP using Docker.

## Prerequisites

- Docker installed on your machine
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the application
yarn docker:compose:up

# Or manually:
docker-compose up --build

# Access the app at: http://localhost:3000
```

### Option 2: Using Docker Commands

```bash
# Build the Docker image
yarn docker:build

# Run the container
yarn docker:run

# Or run in detached mode (background)
yarn docker:run:detached

# Stop the container
yarn docker:stop
```

### Option 3: Manual Docker Commands

```bash
# Build the image
docker build -t cohabs-chat-mvp .

# Run the container
docker run -p 3000:3000 --name cohabs-chat-mvp cohabs-chat-mvp

# Visit: http://localhost:3000
```

## Development with Docker

To run with live reload for development:

```bash
# Use the development profile
yarn docker:compose:dev

# This will:
# - Mount your source code as volumes
# - Run on port 3001 (to avoid conflicts)
# - Enable hot reload
```

## Available Commands

| Command                    | Description                             |
| -------------------------- | --------------------------------------- |
| `yarn docker:build`        | Build the Docker image                  |
| `yarn docker:run`          | Run container in foreground             |
| `yarn docker:run:detached` | Run container in background             |
| `yarn docker:stop`         | Stop and remove container               |
| `yarn docker:compose:up`   | Run with Docker Compose                 |
| `yarn docker:compose:down` | Stop Docker Compose services            |
| `yarn docker:compose:dev`  | Run development version with hot reload |

## Deployment Ready

This Docker setup makes the application ready for deployment on:

- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Any VPS with Docker support

## Troubleshooting

### Port Already in Use

```bash
# Stop any running containers
docker stop cohabs-chat-mvp
docker rm cohabs-chat-mvp

# Or use docker-compose
docker-compose down
```

### Clean Build

```bash
# Remove existing image and rebuild
docker rmi cohabs-chat-mvp
yarn docker:build
```

### View Container Logs

```bash
# If running with docker-compose
docker-compose logs app

# If running with docker run
docker logs cohabs-chat-mvp
```
