FROM node

ARG WORK_DIR=/home/node/om-server

WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY shared/ ${WORK_DIR}/shared
COPY server/ ${WORK_DIR}/server

RUN yarn run installServer
RUN yarn run buildDeployServer

RUN rm -rf shared server/src

ENTRYPOINT [ "yarn", "run", "startServer" ]