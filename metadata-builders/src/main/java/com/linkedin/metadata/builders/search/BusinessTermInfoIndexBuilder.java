package com.linkedin.metadata.builders.search;

import com.linkedin.common.urn.BusinessTermUrn;
import com.linkedin.common.Ownership;
import com.linkedin.data.template.StringArray;
import com.linkedin.data.template.RecordTemplate;
import com.linkedin.business.BusinessTermInfo;
import com.linkedin.metadata.search.BusinessTermInfoDocument;
import com.linkedin.metadata.snapshot.BusinessTermSnapshot;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.annotation.Nonnull;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class BusinessTermInfoIndexBuilder extends BaseIndexBuilder<BusinessTermInfoDocument> {

  public BusinessTermInfoIndexBuilder() {
    super(Collections.singletonList(BusinessTermSnapshot.class), BusinessTermInfoDocument.class);
  }

  @Nonnull
  private BusinessTermInfoDocument getDocumentToUpdateFromAspect(@Nonnull BusinessTermUrn urn, @Nonnull Ownership ownership) {
    final StringArray owners = BuilderUtils.getCorpUserOwners(ownership);
    return new BusinessTermInfoDocument()
            .setUrn(urn)
            .setOwners(owners);
  }

  @Nonnull
  private BusinessTermInfoDocument getDocumentToUpdateFromAspect(@Nonnull BusinessTermUrn urn,
      @Nonnull BusinessTermInfo businessTermInfo) {
    final String name = urn.getNameEntity() == null ? "" : urn.getNameEntity();
    final String definition = businessTermInfo.getDefinition() == null ? "" : businessTermInfo.getDefinition();
    final String termSource = businessTermInfo.getTermSource() == null ? "" : businessTermInfo.getTermSource();
    return new BusinessTermInfoDocument().setUrn(urn)
        .setDefinition(definition)
        .setTermSource(termSource)
        .setName(name);
  }

  @Nonnull
  private List<BusinessTermInfoDocument> getDocumentsToUpdateFromSnapshotType(@Nonnull BusinessTermSnapshot businessTermSnapshot) {
    BusinessTermUrn urn = businessTermSnapshot.getUrn();
    return businessTermSnapshot.getAspects().stream().map(aspect -> {
      if (aspect.isBusinessTermInfo()) {
        return getDocumentToUpdateFromAspect(urn, aspect.getBusinessTermInfo());
      } else if (aspect.isOwnership()) {
        return getDocumentToUpdateFromAspect(urn, aspect.getOwnership());
      }
      return null;
    }).filter(Objects::nonNull).collect(Collectors.toList());
  }

  @Override
  @Nonnull
  public final List<BusinessTermInfoDocument> getDocumentsToUpdate(@Nonnull RecordTemplate genericSnapshot) {
    if (genericSnapshot instanceof BusinessTermSnapshot) {
      return getDocumentsToUpdateFromSnapshotType((BusinessTermSnapshot) genericSnapshot);
    }
    return Collections.emptyList();
  }

  @Override
  @Nonnull
  public Class<BusinessTermInfoDocument> getDocumentType() {
    return BusinessTermInfoDocument.class;
  }
}