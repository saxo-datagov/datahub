# Defining environment
ARG APP_ENV=prod

FROM artifacts.sys.dom/docker/openjdk:8-jre-alpine as base

FROM artifacts.sys.dom/docker/gradle:5.6.4-jdk8 as prod-build
ENV DOCKERIZE_VERSION v0.6.1

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

#Adding ssl certificates here as not allowed in helm charts due to saxo security policy
##Deployment ssl certtificate for test
RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias TST-SaxoBankInternalRootCA1 -file /TST-SaxoBankInternalRootCA1.cer -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit

#Deployment ssl certtificate for dev and prod
RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias SaxoBankInternalIssuingCA11 -file /SaxoBankInternalIssuingCA11.cer -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit

FROM base as dev-install
# Dummy stage for development. Assumes code is built on your machine and mounted to this image.
# See this excellent thread https://github.com/docker/cli/issues/1134

FROM ${APP_ENV}-install as final

RUN addgroup -S datahub && adduser -S datahub -G datahub
USER datahub

EXPOSE 8080

CMD ["sh", "-c", \
    "export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))); \
     export SPRING_KAFKA_PROPERTIES_SSL_TRUSTSTORE_LOCATION=$JAVA_HOME/lib/security/cacerts; \
     export SPRING_KAFKA_PROPERTIES_SSL_TRUSTSTORE_PASSWORD=changeit; \
     /datahub/datahub-gms/scripts/start.sh"]