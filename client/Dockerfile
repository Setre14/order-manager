FROM node

ARG WORK_DIR=/home/node/om

WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY shared/ ${WORK_DIR}/shared
COPY client/ ${WORK_DIR}/client

RUN yarn run installClient
RUN yarn run buildDeployClient

RUN rm -rf shared client/src

ENTRYPOINT [ "yarn", "run", "startClient" ]
