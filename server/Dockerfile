FROM node

ARG WORK_DIR=/home/node/om-server

WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY server/ ${WORK_DIR}/server
COPY shared/ ${WORK_DIR}/shared

RUN yarn run installServer
RUN yarn run buildDeployServer

ENTRYPOINT [ "yarn", "run", "startServer" ]