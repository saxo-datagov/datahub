# Defining environment
ARG APP_ENV=prod
ARG version

FROM artifacts.cf.saxo/docker/base/saxo-gradle:5.4.1-node12.8.0-ubuntu-ci-1.0.6 as builder
FROM openjdk:8-jre-alpine as base
RUN addgroup -S datahub && adduser -S datahub -G datahub
RUN apk --no-cache add curl

COPY --from=artifacts.sys.dom/docker-local/teams/datagov/chrome-stable:latest ./google-chrome-stable_current_amd64.deb google-chrome-stable_current_amd64.deb
RUN apt-get -y update && apt-get -y install ./google-chrome-stable_current_amd64.deb

ENV CI=true

COPY --chown=gradle:gradle . /datahub-src

RUN npm install -g yarn@1.13.0

RUN yarn config set strict-ssl false \
    && yarn config set registry https://artifacts.cf.saxo/artifactory/api/npm/npm/

RUN cd /datahub-src && gradle :datahub-frontend:dist -PenableEmber=${ENABLE_EMBER} \
    && cp datahub-frontend/build/distributions/datahub-frontend.zip ../datahub-frontend.zip \
    && cd .. && rm -rf datahub-src && unzip datahub-frontend.zip

FROM artifacts.sys.dom/docker/linkedin/datahub-frontend:$version

COPY --from=builder /datahub-frontend /datahub-frontend/

HEALTHCHECK --start-period=2m --retries=4 CMD curl --fail http://localhost:$SERVER_PORT/admin || exit 1

ENV JAVA_OPTS=" \
   -Xms512m \
   -Xmx1024m \
   -Dhttp.port=9002 \
   -Dconfig.file=datahub-frontend/conf/application.conf \
   -Djava.security.auth.login.config=datahub-frontend/conf/jaas.conf \
   -Dlogback.configurationFile=datahub-frontend/conf/logback.xml \
   -Dlogback.debug=true \
   -Dplay.server.pidfile.path=/dev/null"
CMD ["datahub-frontend/bin/playBinary"]
