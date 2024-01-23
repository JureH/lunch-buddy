# Lunch Buddy Application

This repository contains the Docker Compose configuration for setting up the Lunch Buddy application, which consists of Angular front-end, Node.js API, MongoDB for data storage, and Redis for caching.

## Prerequisites

Ensure that Docker is installed on your machine.

## Getting Started

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/JureH/lunch-buddy.git
    cd lunch-buddy
    ```

2. Run the following command to start the application:

    ```bash
    docker-compose up -d
    ```

    This will build and start the containers defined in the `docker-compose.yml` file.

3. Access the Angular app in your web browser at [http://localhost:4200](http://localhost:4200).

## Services

### Angular App

- Container Name: `lunch-buddy-angular-app`
- Port Mapping: `4200:80`
- Dockerfile: `./angular/Dockerfile`

### Node.js API

- Container Name: `lunch-buddy-node-api`
- Port Mapping: `3000:3000`
- Image: `lunch-buddy-server`
- Environment Variables:
  - `NODE_ENV: test`
  - `JWT_SECRET: mySecretPassword`

### MongoDB

- Image: `mongo`
- Container Name: `lunch-buddy-mongo-db`
- Port Mapping: `27017:27017`
- Volume: `mongo-data:/data/db`

### Redis

- Image: `redis:latest`
- Container Name: `lunch-buddy-redis`
- Port Mapping: `6379:6379`

## Networks

- Network Name: `lunch-buddy-network`
- Driver: `bridge`

## Volumes

- Volume Name: `mongo-data`

