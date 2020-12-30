package com.linkedin.metadata.dao;

import com.linkedin.common.urn.BusinessTermUrn;
import com.linkedin.metadata.snapshot.BusinessTermSnapshot;


/**
 * An action request builder for corp user info entities.
 */
public class BusinessTermActionRequestBuilder extends BaseActionRequestBuilder<BusinessTermSnapshot, BusinessTermUrn> {

  private static final String BASE_URI_TEMPLATE = "businessTerms";

  public BusinessTermActionRequestBuilder() {
    super(BusinessTermSnapshot.class, BusinessTermUrn.class, BASE_URI_TEMPLATE);
  }
}