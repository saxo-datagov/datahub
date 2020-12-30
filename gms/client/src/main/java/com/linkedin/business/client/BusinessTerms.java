package com.linkedin.business.client;

import com.linkedin.common.urn.BusinessTermUrn;
import com.linkedin.data.template.StringArray;
import com.linkedin.business.BusinessTerm;
import com.linkedin.business.BusinessTermKey;
import com.linkedin.business.BusinessTermsFindBySearchRequestBuilder;
import com.linkedin.business.BusinessTermsRequestBuilders;
import com.linkedin.metadata.query.Filter;
import com.linkedin.metadata.query.SortCriterion;
import com.linkedin.metadata.restli.BaseSearchableClient;
import com.linkedin.r2.RemoteInvocationException;
import com.linkedin.restli.client.BatchGetEntityRequest;
import com.linkedin.restli.client.Client;
import com.linkedin.restli.client.GetAllRequest;
import com.linkedin.restli.client.GetRequest;
import com.linkedin.restli.common.CollectionResponse;
import com.linkedin.restli.common.ComplexResourceKey;
import com.linkedin.restli.common.EmptyRecord;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import static com.linkedin.metadata.dao.utils.QueryUtils.*;

public class BusinessTerms extends BaseSearchableClient<BusinessTerm> {

  private static final BusinessTermsRequestBuilders BUSINESS_TERMS_REQUEST_BUILDERS = new BusinessTermsRequestBuilders();

  public BusinessTerms(@Nonnull Client restliClient) {
    super(restliClient);
  }

  /**
   * Gets {@link BusinessTerm} model of the corp user
   *
   * @param urn corp user urn
   * @return {@link BusinessTerm} model of the corp user
   * @throws RemoteInvocationException
   */
  @Nonnull
  public BusinessTerm get(@Nonnull BusinessTermUrn urn)
      throws RemoteInvocationException {
    GetRequest<BusinessTerm> getRequest = BUSINESS_TERMS_REQUEST_BUILDERS.get()
        .id(new ComplexResourceKey<>(toBusinessTermKey(urn), new EmptyRecord()))
        .build();

    return _client.sendRequest(getRequest).getResponse().getEntity();
  }

  /**
   * Batch gets list of {@link BusinessTerm} models of the corp users
   *
   * @param urns list of corp user urn
   * @return map of {@link BusinessTerm} models of the corp users
   * @throws RemoteInvocationException
   */
  @Nonnull
  public Map<BusinessTermUrn, BusinessTerm> batchGet(@Nonnull Set<BusinessTermUrn> urns)
      throws RemoteInvocationException {
    BatchGetEntityRequest<ComplexResourceKey<BusinessTermKey, EmptyRecord>, BusinessTerm> batchGetRequest
        = BUSINESS_TERMS_REQUEST_BUILDERS.batchGet()
        .ids(urns.stream().map(this::getKeyFromUrn).collect(Collectors.toSet()))
        .build();

    return _client.sendRequest(batchGetRequest).getResponseEntity().getResults()
        .entrySet().stream().collect(Collectors.toMap(
            entry -> getUrnFromKey(entry.getKey()),
            entry -> entry.getValue().getEntity())
        );
  }

  /**
   * Get all {@link BusinessTerm} models of the corp users
   *
   * @param start offset to start
   * @param count number of max {@link BusinessTerm}s to return
   * @return {@link BusinessTerm} models of the corp user
   * @throws RemoteInvocationException
   */
  @Nonnull
  public List<BusinessTerm> getAll(int start, int count)
      throws RemoteInvocationException {
    final GetAllRequest<BusinessTerm> getAllRequest = BUSINESS_TERMS_REQUEST_BUILDERS.getAll()
        .paginate(start, count)
        .build();
    return _client.sendRequest(getAllRequest).getResponseEntity().getElements();
  }

  /**
   * Get all {@link BusinessTerm} models of the corp users
   *
   * @return {@link BusinessTerm} models of the corp user
   * @throws RemoteInvocationException
   */
  @Nonnull
  public List<BusinessTerm> getAll()
      throws RemoteInvocationException {
    GetAllRequest<BusinessTerm> getAllRequest = BUSINESS_TERMS_REQUEST_BUILDERS.getAll()
        .paginate(0, 10000)
        .build();
    return _client.sendRequest(getAllRequest).getResponseEntity().getElements();
  }

  @Override
  @Nonnull
  public CollectionResponse<BusinessTerm> search(@Nonnull String input, @Nullable StringArray aspectNames,
                                             @Nullable Map<String, String> requestFilters, @Nullable SortCriterion sortCriterion, int start, int count)
          throws RemoteInvocationException {
    final Filter filter = (requestFilters != null) ? newFilter(requestFilters) : null;
    final BusinessTermsFindBySearchRequestBuilder requestBuilder = BUSINESS_TERMS_REQUEST_BUILDERS.findBySearch()
            .inputParam(input)
            .aspectsParam(aspectNames)
            .filterParam(filter)
            .sortParam(sortCriterion)
            .paginate(start, count);
    return _client.sendRequest(requestBuilder.build()).getResponse().getEntity();
  }

  @Nonnull
  public CollectionResponse<BusinessTerm> search(@Nonnull String input, @Nullable Map<String, String> requestFilters,
                                             int start, int count) throws RemoteInvocationException {
    return search(input, requestFilters, null, start, count);
  }

  @Nonnull
  public CollectionResponse<BusinessTerm> search(@Nonnull String input, int start, int count)
          throws RemoteInvocationException {
    return search(input, null, null, start, count);
  }

  @Nonnull
  private BusinessTermKey toBusinessTermKey(@Nonnull BusinessTermUrn urn) {
    return new BusinessTermKey()
            .setName(urn.getNameEntity())
            .setDomain(urn.getDomainEntity());
  }

  @Nonnull
  protected BusinessTermUrn toBusinessTermUrn(@Nonnull BusinessTermKey key) {
    return new BusinessTermUrn(key.getDomain(), key.getName());
  }

  @Nonnull
  private ComplexResourceKey<BusinessTermKey, EmptyRecord> getKeyFromUrn(@Nonnull BusinessTermUrn urn) {
    return new ComplexResourceKey<>(toBusinessTermKey(urn), new EmptyRecord());
  }

  @Nonnull
  private BusinessTermUrn getUrnFromKey(@Nonnull ComplexResourceKey<BusinessTermKey, EmptyRecord> key) {
    return toBusinessTermUrn(key.getKey());
  }
}
