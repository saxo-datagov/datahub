package com.linkedin.metadata.builders.graph;

import com.linkedin.common.urn.DatasetUrn;
import com.linkedin.data.template.RecordTemplate;
import com.linkedin.metadata.builders.graph.relationship.BaseRelationshipBuilder;
import com.linkedin.metadata.builders.graph.relationship.DownstreamOfBuilderFromUpstreamLineage;
import com.linkedin.metadata.builders.graph.relationship.OwnedByBuilderFromOwnership;
import com.linkedin.metadata.builders.graph.relationship.RelatedToBuilderFromDatasetGlossaryTerm;
import com.linkedin.metadata.builders.graph.relationship.RelatedToBuilderFromDatasetFieldGlossaryTerm;
import com.linkedin.metadata.entity.DatasetEntity;
import com.linkedin.metadata.snapshot.DatasetSnapshot;

import javax.annotation.Nonnull;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DatasetGraphBuilder extends BaseGraphBuilder<DatasetSnapshot> {
    private static final Set<BaseRelationshipBuilder> RELATIONSHIP_BUILDERS =
            Collections.unmodifiableSet(new HashSet<BaseRelationshipBuilder>() {
                {
                    add(new DownstreamOfBuilderFromUpstreamLineage());
                    add(new OwnedByBuilderFromOwnership());
                    add(new RelatedToBuilderFromDatasetGlossaryTerm());
                    add(new RelatedToBuilderFromDatasetFieldGlossaryTerm());
                }
            });

    public DatasetGraphBuilder() {
        super(DatasetSnapshot.class, RELATIONSHIP_BUILDERS);
    }

    @Nonnull
    @Override
    protected List<? extends RecordTemplate> buildEntities(@Nonnull DatasetSnapshot snapshot) {
        final DatasetUrn urn = snapshot.getUrn();
        final DatasetEntity entity = new DatasetEntity().setUrn(urn)
                .setName(urn.getDatasetNameEntity())
                .setPlatform(urn.getPlatformEntity())
                .setOrigin(urn.getOriginEntity());

        setRemovedProperty(snapshot, entity);

        return Collections.singletonList(entity);
    }
}
