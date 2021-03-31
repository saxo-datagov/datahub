package com.linkedin.metadata.builders.search;

import com.linkedin.common.urn.GlossaryTermUrn;
import com.linkedin.common.Ownership;
import com.linkedin.data.template.StringArray;
import com.linkedin.data.template.RecordTemplate;
import com.linkedin.glossary.GlossaryTermInfo;
import com.linkedin.metadata.search.GlossaryTermInfoDocument;
import com.linkedin.metadata.snapshot.GlossaryTermSnapshot;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.annotation.Nonnull;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public class GlossaryTermInfoIndexBuilder extends BaseIndexBuilder<GlossaryTermInfoDocument> {

  public GlossaryTermInfoIndexBuilder() {
    super(Collections.singletonList(GlossaryTermSnapshot.class), GlossaryTermInfoDocument.class);
  }

  @Nonnull
  private GlossaryTermInfoDocument getDocumentToUpdateFromAspect(@Nonnull GlossaryTermUrn urn, @Nonnull Ownership ownership) {
    final StringArray owners = BuilderUtils.getCorpUserOwners(ownership);
    return new GlossaryTermInfoDocument()
            .setUrn(urn)
            .setOwners(owners);
  }

  @Nonnull
  private GlossaryTermInfoDocument getDocumentToUpdateFromAspect(@Nonnull GlossaryTermUrn urn,
      @Nonnull GlossaryTermInfo glossaryTermInfo) {
    final String name = urn.getNameEntity() == null ? "" : urn.getNameEntity();
    final String definition = glossaryTermInfo.getDefinition() == null ? "" : glossaryTermInfo.getDefinition();
    final String termSource = glossaryTermInfo.getTermSource() == null ? "" : glossaryTermInfo.getTermSource();
    return new GlossaryTermInfoDocument().setUrn(urn)
        .setDefinition(definition)
        .setTermSource(termSource)
        .setName(name);
  }

  @Nonnull
  private List<GlossaryTermInfoDocument> getDocumentsToUpdateFromSnapshotType(@Nonnull GlossaryTermSnapshot glossaryTermSnapshot) {
    GlossaryTermUrn urn = glossaryTermSnapshot.getUrn();
    return glossaryTermSnapshot.getAspects().stream().map(aspect -> {
      if (aspect.isGlossaryTermInfo()) {
        return getDocumentToUpdateFromAspect(urn, aspect.getGlossaryTermInfo());
      } else if (aspect.isOwnership()) {
        return getDocumentToUpdateFromAspect(urn, aspect.getOwnership());
      }
      return null;
    }).filter(Objects::nonNull).collect(Collectors.toList());
  }

  @Override
  @Nonnull
  public final List<GlossaryTermInfoDocument> getDocumentsToUpdate(@Nonnull RecordTemplate genericSnapshot) {
    if (genericSnapshot instanceof GlossaryTermSnapshot) {
      return getDocumentsToUpdateFromSnapshotType((GlossaryTermSnapshot) genericSnapshot);
    }
    return Collections.emptyList();
  }

  @Override
  @Nonnull
  public Class<GlossaryTermInfoDocument> getDocumentType() {
    return GlossaryTermInfoDocument.class;
  }
}