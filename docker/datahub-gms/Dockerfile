# Defining environment
ARG APP_ENV=prod

FROM artifacts.cf.saxo/docker/base/saxo-gradle:5.4.1-node12.8.0-ubuntu-ci-1.0.6 as base
FROM artifacts.sys.dom/docker/gradle:5.6.4-jdk8 as prod-build
ENV DOCKERIZE_VERSION v0.6.1

RUN curl https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.4.20.v20190813/jetty-runner-9.4.20.v20190813.jar --output jetty-runner.jar \
    && curl https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-jmx/9.4.20.v20190813/jetty-jmx-9.4.20.v20190813.jar --output jetty-jmx.jar \
    && curl https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-util/9.4.20.v20190813/jetty-util-9.4.20.v20190813.jar --output jetty-util.jar \
    && curl -L https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar -C /usr/local/bin -xzv

COPY --chown=gradle:gradle . /datahub-src
RUN cp -r /datahub-src/dockerize /usr/local/bin

RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias SaxoBankInternalIssuingCA11 -file /datahub-src/SaxoBankInternalIssuingCA11.cer -keystore $JAVA_HOME/jre/lib/security/cacerts -storepass changeit

RUN cd /datahub-src && gradle :gms:war:build
RUN cp /datahub-src/gms/war/build/libs/war.war /war.war

FROM base as prod-install
COPY --from=prod-build /usr/local/bin /usr/local/bin
COPY --from=prod-build /war.war /datahub/datahub-gms/bin/war.war
COPY --from=prod-build /datahub-src/jetty-runner.jar /jetty-runner.jar
COPY --from=prod-build /datahub-src/docker/datahub-gms/start.sh /datahub/datahub-gms/scripts/start.sh
COPY --from=prod-build /datahub-src/SaxoBankInternalIssuingCA11.cer /SaxoBankInternalIssuingCA11.cer
COPY --from=prod-build /datahub-src/TST-SaxoBankInternalRootCA1.cer /TST-SaxoBankInternalRootCA1.cer


FROM base as dev-install
# Dummy stage for development. Assumes code is built on your machine and mounted to this image.
# See this excellent thread https://github.com/docker/cli/issues/1134

FROM ${APP_ENV}-install as final


USER datahub

ENV JMX_OPTS=""
ENV JAVA_OPTS=""

EXPOSE 8080

CMD ["sh", "-c", \
    "export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))); \
     export SPRING_KAFKA_PROPERTIES_SSL_TRUSTSTORE_LOCATION=$JAVA_HOME/jre/lib/security/cacerts; \
     export SPRING_KAFKA_PROPERTIES_SSL_TRUSTSTORE_PASSWORD=changeit; \
     /datahub/datahub-gms/scripts/start.sh"]
