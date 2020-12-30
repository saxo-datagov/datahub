package com.linkedin.gms.factory.business;

import com.linkedin.gms.factory.common.TopicConventionFactory;
import com.linkedin.common.urn.BusinessTermUrn;
import com.linkedin.metadata.aspect.BusinessTermAspect;
import com.linkedin.metadata.dao.BaseLocalDAO;
import com.linkedin.metadata.dao.EbeanLocalDAO;
import com.linkedin.metadata.dao.producer.KafkaMetadataEventProducer;
import com.linkedin.metadata.snapshot.BusinessTermSnapshot;
import com.linkedin.mxe.TopicConvention;
import io.ebean.config.ServerConfig;
import org.apache.kafka.clients.producer.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Nonnull;


@Configuration
public class BusinessTermDaoFactory {
  @Autowired
  ApplicationContext applicationContext;

  @Bean(name = "businessTermDao")
  @DependsOn({"gmsEbeanServiceConfig", "kafkaEventProducer", TopicConventionFactory.TOPIC_CONVENTION_BEAN})
  @Nonnull
  protected BaseLocalDAO<BusinessTermAspect, BusinessTermUrn> createInstance() {
    KafkaMetadataEventProducer<BusinessTermSnapshot, BusinessTermAspect, BusinessTermUrn> producer =
        new KafkaMetadataEventProducer(BusinessTermSnapshot.class, BusinessTermAspect.class,
            applicationContext.getBean(Producer.class), applicationContext.getBean(TopicConvention.class));
    return new EbeanLocalDAO<>(BusinessTermAspect.class, producer, applicationContext.getBean(ServerConfig.class),
        BusinessTermUrn.class);
  }
}