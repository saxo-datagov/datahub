package com.linkedin.gms.factory.business;

import com.linkedin.metadata.configs.BusinessTermSearchConfig;
import com.linkedin.metadata.dao.search.ESSearchDAO;
import com.linkedin.metadata.search.BusinessTermInfoDocument;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

import javax.annotation.Nonnull;

@Configuration
public class BusinessTermSearchDaoFactory {
  @Autowired
  ApplicationContext applicationContext;

  @Bean(name = "businessTermSearchDAO")
  @DependsOn({"elasticSearchRestHighLevelClient"})
  @Nonnull
  protected ESSearchDAO createInstance() {
    return new ESSearchDAO(applicationContext.getBean(RestHighLevelClient.class), BusinessTermInfoDocument.class,
        new BusinessTermSearchConfig());
  }
}