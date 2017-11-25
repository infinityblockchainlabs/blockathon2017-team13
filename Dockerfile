FROM            node:8.5.0-alpine

WORKDIR         /usr/share/api
COPY            . .

RUN             apk update && apk add git curl && \
                curl -o- -L https://yarnpkg.com/install.sh | sh -s -- --version 1.2.1 && \
                yarn install && \
                yarn cache clean

CMD             yarn start
