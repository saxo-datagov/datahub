package com.linkedin.metadata.builders.graph;

import com.linkedin.common.urn.BusinessTermUrn;
import com.linkedin.data.template.RecordTemplate;
import com.linkedin.metadata.builders.graph.relationship.BaseRelationshipBuilder;
import com.linkedin.metadata.builders.graph.relationship.OwnedByBuilderFromOwnership;
import com.linkedin.metadata.entity.BusinessTermEntity;
import com.linkedin.metadata.snapshot.BusinessTermSnapshot;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Nonnull;


public class BusinessTermGraphBuilder extends BaseGraphBuilder<BusinessTermSnapshot> {

  private static final Set<BaseRelationshipBuilder> RELATIONSHIP_BUILDERS =
    Collections.unmodifiableSet(new HashSet<BaseRelationshipBuilder>() {
      {
        add(new OwnedByBuilderFromOwnership());
      }
    });

  public BusinessTermGraphBuilder() {
    super(BusinessTermSnapshot.class, RELATIONSHIP_BUILDERS);
  }

  @Nonnull
  @Override
  protected List<? extends RecordTemplate> buildEntities(@Nonnull BusinessTermSnapshot snapshot) {
    final BusinessTermUrn urn = snapshot.getUrn();
    final BusinessTermEntity entity = new BusinessTermEntity().setUrn(urn)
        .setName(urn.getNameEntity());

    return Collections.singletonList(entity);
  }
}
