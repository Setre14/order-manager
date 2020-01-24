FROM node

ARG WORK_DIR=/home/node/om

WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY client/ ${WORK_DIR}/client
COPY shared/ ${WORK_DIR}/shared

RUN yarn run installClient
RUN yarn run buildDeployClient

ENTRYPOINT [ "yarn", "run", "startClient" ]
