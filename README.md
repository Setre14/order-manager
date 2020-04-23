# Install all dependencies

`yarn installAll`

# Start server

## Development

`cd server && yarn start`

## Production

`yarn startServer`

# Start client

The server must run for the client to work.

## Development

`cd client && yarn start`

## Production

`yarn startClient`

# Start server and mongodb with docker compose

`COMPOSE_HTTP_TIMEOUT=200 docker-compose up`

# Update dockerfiles

## Client

### Linux

```cmd
docker build -f .\client\Dockerfile -t ordermanager/client .
docker push ordermanager/client
```

### Raspberry PI

```cmd
docker build -f ./client/Dockerfile -t ordermanager/client-rpi .
docker push ordermanager/client-rpi
```

## Server

```cmd
docker build -f .\server\Dockerfile -t ordermanager/server .
docker push ordermanager/server
```

## Nginx

### Linux

```cmd
docker build -f .\nginx\Dockerfile -t ordermanager/nginx .
docker push ordermanager/nginx
```

### Raspberry PI

```cmd
docker build -f .\nginx\Dockerfile -t ordermanager/nginx-rpi  --build-arg IMAGE=tobi312/rpi-nginx .
docker push ordermanager/nginx-rpi
```
