# Defining environment
ARG APP_ENV=prod
ARG version

FROM artifacts.cf.saxo/docker/base/saxo-gradle:5.6.4-node14.16.1-ubuntu-ci-1.0.6 as builder

COPY --from=artifacts.sys.dom/docker-local/teams/datagov/chrome-stable:latest ./google-chrome-stable_current_amd64.deb google-chrome-stable_current_amd64.deb
RUN apt-get -y update && apt-get -y install ./google-chrome-stable_current_amd64.deb

ENV CI=true

COPY --chown=gradle:gradle . /datahub-src

RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))

RUN npm install -g yarn@1.13.0

RUN yarn config set strict-ssl false \
    && yarn config set registry https://artifacts.cf.saxo/artifactory/api/npm/npm/

RUN cd /datahub-src && gradle :datahub-frontend:dist -PenableEmber=${ENABLE_EMBER} -x test -x yarnTest -x yarnLint \
    && cp datahub-frontend/build/distributions/datahub-frontend.zip ../datahub-frontend.zip \
    && cd .. && unzip datahub-frontend.zip

FROM artifacts.sys.dom/docker/linkedin/datahub-frontend-react:$version

USER root

COPY --from=builder /datahub-src/SaxoBankInternalIssuingCA11.cer /
COPY --from=builder /datahub-src/TST-SaxoBankInternalRootCA1.cer /


RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias SaxoBankInternalIssuingCA11 -file SaxoBankInternalIssuingCA11.cer -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit \
    && keytool -noprompt -import -alias TST-SaxoBankInternalRootCA1.cer -file TST-SaxoBankInternalRootCA1.cer -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit
COPY --from=builder /datahub-frontend /datahub-frontend/

ENV JAVA_OPTS=" \
   -Xms512m \
   -Xmx1024m \
   -Dhttp.port=9002 \
   -Dconfig.file=datahub-frontend/conf/application.conf \
   -Djava.security.auth.login.config=datahub-frontend/conf/jaas.conf \
   -Dlogback.configurationFile=datahub-frontend/conf/logback.xml \
   -Dlogback.debug=true \
   -Dplay.server.pidfile.path=/dev/null"

CMD ["sh", "-c", \
    "export KAFKA_PROPERTIES_SSL_TRUSTSTORE_LOCATION=/usr/lib/jvm/java-1.8-openjdk/jre/lib/security/cacerts; \
     export KAFKA_PROPERTIES_SSL_TRUSTSTORE_PASSWORD=changeit; \
     datahub-frontend/bin/playBinary"]
