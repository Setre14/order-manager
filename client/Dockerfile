FROM node as builder

ARG WORK_DIR=/home/node/om
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY shared/ ${WORK_DIR}/shared
COPY client/ ${WORK_DIR}/client

RUN yarn run installClient
RUN yarn run buildDeployClient


FROM node

ARG WORK_DIR=/home/node/om
WORKDIR ${WORK_DIR}

COPY --from=builder ${WORK_DIR}/package.json ${WORK_DIR}/package.json
COPY --from=builder ${WORK_DIR}/shared/package.json ${WORK_DIR}/shared/package.json
COPY --from=builder ${WORK_DIR}/client/package.json ${WORK_DIR}/client/package.json
COPY --from=builder ${WORK_DIR}/client/lite-server-config.json ${WORK_DIR}/client/lite-server-config.json
COPY --from=builder ${WORK_DIR}/client/deploy ${WORK_DIR}/client/deploy

RUN yarn run installClientProd

ENTRYPOINT [ "yarn", "run", "startClient" ]
