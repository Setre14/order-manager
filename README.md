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
`wget https://gitlab.com/Setre14/order-manager/raw/master/docker-compose.yaml`
`COMPOSE_HTTP_TIMEOUT=200 docker-compose up`