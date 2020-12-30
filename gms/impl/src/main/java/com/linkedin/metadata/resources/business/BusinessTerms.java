package com.linkedin.metadata.resources.business;

import com.linkedin.common.urn.BusinessTermUrn;
import com.linkedin.common.urn.Urn;
import com.linkedin.business.BusinessTerm;
import com.linkedin.business.BusinessTermInfo;
import com.linkedin.common.Ownership;
import com.linkedin.business.BusinessTermKey;
import com.linkedin.metadata.aspect.BusinessTermAspect;
import com.linkedin.metadata.dao.BaseLocalDAO;
import com.linkedin.metadata.dao.BaseSearchDAO;
import com.linkedin.metadata.dao.utils.ModelUtils;
import com.linkedin.metadata.query.SearchResultMetadata;
import com.linkedin.metadata.query.AutoCompleteResult;
import com.linkedin.metadata.query.SortCriterion;
import com.linkedin.metadata.restli.BackfillResult;
import com.linkedin.metadata.restli.BaseSearchableEntityResource;
import com.linkedin.metadata.search.BusinessTermInfoDocument;
import com.linkedin.metadata.snapshot.BusinessTermSnapshot;
import com.linkedin.parseq.Task;
import com.linkedin.restli.common.ComplexResourceKey;
import com.linkedin.restli.common.EmptyRecord;
import com.linkedin.restli.server.CollectionResult;
import com.linkedin.restli.server.PagingContext;
import com.linkedin.metadata.query.Filter;
import com.linkedin.restli.server.annotations.Action;
import com.linkedin.restli.server.annotations.ActionParam;
import com.linkedin.restli.server.annotations.Finder;
import com.linkedin.restli.server.annotations.Optional;
import com.linkedin.restli.server.annotations.PagingContextParam;
import com.linkedin.restli.server.annotations.QueryParam;
import com.linkedin.restli.server.annotations.RestLiCollection;
import com.linkedin.restli.server.annotations.RestMethod;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.inject.Inject;
import javax.inject.Named;

import static com.linkedin.metadata.restli.RestliConstants.*;

@RestLiCollection(name = "businessTerms", namespace = "com.linkedin.business", keyName = "businessTerm")
public final class BusinessTerms extends BaseSearchableEntityResource<
    // @formatter:off
    ComplexResourceKey<BusinessTermKey, EmptyRecord>,
    BusinessTerm,
    BusinessTermUrn,
    BusinessTermSnapshot,
    BusinessTermAspect,
    BusinessTermInfoDocument> {
    // @formatter:on

  @Inject
  @Named("businessTermDao")
  private BaseLocalDAO<BusinessTermAspect, BusinessTermUrn> _localDAO;

  @Inject
  @Named("businessTermSearchDAO")
  private BaseSearchDAO _esSearchDAO;

  public BusinessTerms() {
    super(BusinessTermSnapshot.class, BusinessTermAspect.class);
  }

  @Override
  @Nonnull
  protected BaseLocalDAO getLocalDAO() {
    return _localDAO;
  }

  @Nonnull
  @Override
  protected BusinessTermUrn createUrnFromString(@Nonnull String urnString) throws Exception {
    return BusinessTermUrn.createFromUrn(Urn.createFromString(urnString));
  }

  @Override
  @Nonnull
  protected BaseSearchDAO getSearchDAO() {
    return _esSearchDAO;
  }

  @Override
  @Nonnull
  protected BusinessTermUrn toUrn(@Nonnull ComplexResourceKey<BusinessTermKey, EmptyRecord> key) {
    return new BusinessTermUrn(key.getKey().getDomain(), key.getKey().getName());
  }

  @Override
  @Nonnull
  protected ComplexResourceKey<BusinessTermKey, EmptyRecord> toKey(@Nonnull BusinessTermUrn urn) {
    return new ComplexResourceKey<>(new BusinessTermKey().setName(urn.getNameEntity()).setDomain(urn.getDomainEntity()), new EmptyRecord());
  }

  @Override
  @Nonnull
  protected BusinessTerm toValue(@Nonnull BusinessTermSnapshot snapshot) {
    final BusinessTerm value = new BusinessTerm()
            .setName(snapshot.getUrn().getNameEntity())
            .setDomain(snapshot.getUrn().getDomainEntity());
    ModelUtils.getAspectsFromSnapshot(snapshot).forEach(aspect -> {
      if (aspect instanceof BusinessTermInfo) {
        value.setBusinessTermInfo(BusinessTermInfo.class.cast(aspect));
      }
      if (aspect instanceof Ownership) {
        value.setOwnership(Ownership.class.cast(aspect));
      }
    });
    return value;
  }

  @Override
  @Nonnull
  protected BusinessTermSnapshot toSnapshot(@Nonnull BusinessTerm businessTerm, @Nonnull BusinessTermUrn businessTermUrn) {
    final List<BusinessTermAspect> aspects = new ArrayList<>();
    if (businessTerm.hasBusinessTermInfo()) {
      aspects.add(ModelUtils.newAspectUnion(BusinessTermAspect.class, businessTerm.getBusinessTermInfo()));
    }
    if (businessTerm.hasOwnership()) {
      aspects.add(ModelUtils.newAspectUnion(BusinessTermAspect.class, businessTerm.getOwnership()));
    }
    return ModelUtils.newSnapshot(BusinessTermSnapshot.class, businessTermUrn, aspects);
  }

  @RestMethod.Get
  @Override
  @Nonnull
  public Task<BusinessTerm> get(@Nonnull ComplexResourceKey<BusinessTermKey, EmptyRecord> key,
      @QueryParam(PARAM_ASPECTS) @Optional @Nullable String[] aspectNames) {
    return super.get(key, aspectNames);
  }

  @RestMethod.BatchGet
  @Override
  @Nonnull
  public Task<Map<ComplexResourceKey<BusinessTermKey, EmptyRecord>, BusinessTerm>> batchGet(
      @Nonnull Set<ComplexResourceKey<BusinessTermKey, EmptyRecord>> keys,
      @QueryParam(PARAM_ASPECTS) @Optional @Nullable String[] aspectNames) {
    return super.batchGet(keys, aspectNames);
  }

  @RestMethod.GetAll
  @Nonnull
  public Task<List<BusinessTerm>> getAll(@PagingContextParam @Nonnull PagingContext pagingContext,
      @QueryParam(PARAM_ASPECTS) @Optional @Nullable String[] aspectNames,
      @QueryParam(PARAM_FILTER) @Optional @Nullable Filter filter,
      @QueryParam(PARAM_SORT) @Optional @Nullable SortCriterion sortCriterion) {
    return super.getAll(pagingContext, aspectNames, filter, sortCriterion);
  }

  @Action(name = ACTION_INGEST)
  @Override
  @Nonnull
  public Task<Void> ingest(@ActionParam(PARAM_SNAPSHOT) @Nonnull BusinessTermSnapshot snapshot) {
    return super.ingest(snapshot);
  }

  @Finder(FINDER_SEARCH)
  @Override
  @Nonnull
  public Task<CollectionResult<BusinessTerm, SearchResultMetadata>> search(@QueryParam(PARAM_INPUT) @Nonnull String input,
                                                                       @QueryParam(PARAM_ASPECTS) @Optional @Nullable String[] aspectNames,
                                                                       @QueryParam(PARAM_FILTER) @Optional @Nullable Filter filter,
                                                                       @QueryParam(PARAM_SORT) @Optional @Nullable SortCriterion sortCriterion,
                                                                       @PagingContextParam @Nonnull PagingContext pagingContext) {
    return super.search(input, aspectNames, filter, sortCriterion, pagingContext);
  }

  @Action(name = ACTION_AUTOCOMPLETE)
  @Override
  @Nonnull
  public Task<AutoCompleteResult> autocomplete(@ActionParam(PARAM_QUERY) @Nonnull String query,
                                               @ActionParam(PARAM_FIELD) @Nullable String field, @ActionParam(PARAM_FILTER) @Nullable Filter filter,
                                               @ActionParam(PARAM_LIMIT) int limit) {
    return super.autocomplete(query, field, filter, limit);
  }

  @Action(name = ACTION_GET_SNAPSHOT)
  @Override
  @Nonnull
  public Task<BusinessTermSnapshot> getSnapshot(@ActionParam(PARAM_URN) @Nonnull String urnString,
      @ActionParam(PARAM_ASPECTS) @Optional @Nullable String[] aspectNames) {
    return super.getSnapshot(urnString, aspectNames);
  }

  @Action(name = ACTION_BACKFILL)
  @Override
  @Nonnull
  public Task<BackfillResult> backfill(@ActionParam(PARAM_URN) @Nonnull String urnString,
      @ActionParam(PARAM_ASPECTS) @Optional @Nullable String[] aspectNames) {
    return super.backfill(urnString, aspectNames);
  }
}
