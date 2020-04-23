FROM node as builder

ARG WORK_DIR=/home/node/om
WORKDIR ${WORK_DIR}

COPY package.json ${WORK_DIR}
COPY shared/ ${WORK_DIR}/shared
COPY server/ ${WORK_DIR}/server

RUN yarn run installServer
RUN yarn run buildDeployServer


FROM node

ARG WORK_DIR=/home/node/om
WORKDIR ${WORK_DIR}

COPY --from=builder ${WORK_DIR}/package.json ${WORK_DIR}/package.json
COPY --from=builder ${WORK_DIR}/shared/package.json ${WORK_DIR}/shared/package.json
COPY --from=builder ${WORK_DIR}/server/package.json ${WORK_DIR}/server/package.json
COPY --from=builder ${WORK_DIR}/server/deploy ${WORK_DIR}/server/deploy

RUN yarn run installServerProd

ENTRYPOINT [ "yarn", "run", "startServer" ]