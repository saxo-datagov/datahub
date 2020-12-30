package com.linkedin.metadata.configs;

import com.linkedin.metadata.dao.search.BaseSearchConfig;
import com.linkedin.metadata.dao.utils.SearchUtils;
import com.linkedin.metadata.search.BusinessTermInfoDocument;
import java.util.Collections;
import java.util.Set;
import javax.annotation.Nonnull;


public class BusinessTermSearchConfig extends BaseSearchConfig<BusinessTermInfoDocument> {
  @Override
  @Nonnull
  public Set<String> getFacetFields() {
    return Collections.emptySet();
  }

  @Override
  @Nonnull
  public Class<BusinessTermInfoDocument> getSearchDocument() {
    return BusinessTermInfoDocument.class;
  }

  @Override
  @Nonnull
  public String getDefaultAutocompleteField() {
    return "definition";
  }

  @Override
  @Nonnull
  public String getSearchQueryTemplate() {
    return SearchUtils.readResourceFile(getClass(), "businessTermESSearchQueryTemplate.json");
  }

  @Override
  @Nonnull
  public String getAutocompleteQueryTemplate() {
    return SearchUtils.readResourceFile(getClass(), "businessTermESAutocompleteQueryTemplate.json");
  }
}