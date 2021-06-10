# Defining environment
ARG APP_ENV=prod

FROM artifacts.sys.dom/docker/openjdk:8-jre-alpine as base

# Workaround alpine issue with /lib64 not being in the ld library path
# https://gitlab.alpinelinux.org/alpine/aports/-/issues/10140
ENV LD_LIBRARY_PATH=/lib64

FROM artifacts.sys.dom/docker/gradle:5.6.4-jdk8 as prod-build
ENV DOCKERIZE_VERSION v0.6.1

COPY --chown=gradle:gradle . /datahub-src

RUN curl -L https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz --proxy http://dk.proxy.mid.dom:80 | tar -C /usr/local/bin -xzv

RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias SaxoBankInternalIssuingCA11 -file /datahub-src/SaxoBankInternalIssuingCA11.cer -keystore $JAVA_HOME/jre/lib/security/cacerts -storepass changeit

RUN cd /datahub-src && gradle :metadata-jobs:mce-consumer-job:build
RUN cd /datahub-src && cp metadata-jobs/mce-consumer-job/build/libs/mce-consumer-job.jar ../mce-consumer-job.jar

FROM base as prod-install
COPY --from=prod-build /usr/local/bin /usr/local/bin
COPY --from=prod-build /mce-consumer-job.jar /datahub/datahub-mce-consumer/bin/
COPY --from=prod-build /datahub-src/docker/datahub-mce-consumer/start.sh /datahub/datahub-mce-consumer/scripts/
COPY --from=prod-build /datahub-src/SaxoBankInternalIssuingCA11.cer /SaxoBankInternalIssuingCA11.cer
RUN chmod +x /datahub/datahub-mce-consumer/scripts/start.sh

RUN JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))) \
    && keytool -noprompt -import -alias SaxoBankInternalIssuingCA11 -file /SaxoBankInternalIssuingCA11.cer -keystore $JAVA_HOME/lib/security/cacerts -storepass changeit

FROM base as dev-install
# Dummy stage for development. Assumes code is built on your machine and mounted to this image.
# See this excellent thread https://github.com/docker/cli/issues/1134

FROM ${APP_ENV}-install as final

RUN addgroup -S datahub && adduser -S datahub -G datahub
USER datahub

ENV JMX_OPTS=""
ENV JAVA_OPTS=""

EXPOSE 9090

CMD ["sh", "-c", \
    "export JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java)))); \
     export SPRING_KAFKA_PROPERTIES_SSL_TRUSTSTORE_LOCATION=$JAVA_HOME/lib/security/cacerts; \
     export SPRING_KAFKA_PROPERTIES_SSL_TRUSTSTORE_PASSWORD=changeit; \
     /datahub/datahub-mce-consumer/scripts/start.sh"]
