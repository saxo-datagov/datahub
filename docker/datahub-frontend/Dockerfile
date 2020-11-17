ARG version

FROM artifacts.sys.dom/docker/gradle:5.6.4-jdk8 as builder

ARG ENABLE_EMBER="false"

COPY --from=artifacts.sys.dom/docker-local/teams/datagov/chrome-stable:latest ./google-chrome-stable_current_amd64.deb google-chrome-stable_current_amd64.deb
RUN apt-get -y update && apt-get -y install ./google-chrome-stable_current_amd64.deb

ENV CI=true

COPY --chown=gradle:gradle . /datahub-src

RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias SaxoBankInternalIssuingCA11 -file /datahub-src/SaxoBankInternalIssuingCA11.cer -keystore $JAVA_HOME/jre/lib/security/cacerts -storepass changeit

RUN apt-get install -y npm \
    && npm install -g n && n 12.8.0 \
    && npm install -g yarn@1.13.0

RUN yarn config set strict-ssl false \
    && yarn config set registry https://artifacts.cf.saxo/artifactory/api/npm/npm/

RUN cd /datahub-src && gradle :datahub-frontend:dist -PenableEmber=${ENABLE_EMBER} \
    && cp datahub-frontend/build/distributions/datahub-frontend.zip ../datahub-frontend.zip \
    && cd .. && rm -rf datahub-src && unzip datahub-frontend.zip

FROM artifacts.sys.dom/docker/linkedin/datahub-frontend:$version

COPY --from=builder /datahub-frontend /datahub-frontend/

ENV JAVA_OPTS=" \
   -Xms512m \
   -Xmx1024m \
   -Dhttp.port=9001 \
   -Dconfig.file=datahub-frontend/conf/application.conf \
   -Djava.security.auth.login.config=datahub-frontend/conf/jaas.conf \
   -Dlogback.configurationFile=datahub-frontend/conf/logback.xml \
   -Dlogback.debug=true \
   -Dplay.server.pidfile.path=/dev/null"
CMD ["datahub-frontend/bin/playBinary"]