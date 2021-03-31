package com.linkedin.metadata.builders.graph.relationship;


import com.linkedin.common.urn.Urn;
import com.linkedin.dataset.DatasetGlossaryTerm;
import com.linkedin.metadata.builders.graph.GraphBuilder;
import com.linkedin.metadata.relationship.RelatedTo;

import javax.annotation.Nonnull;
import java.util.Collections;
import java.util.List;

import static com.linkedin.metadata.dao.internal.BaseGraphWriterDAO.RemovalOption.REMOVE_ALL_EDGES_FROM_SOURCE;


public class RelatedToBuilderFromDatasetGlossaryTerm extends BaseRelationshipBuilder<DatasetGlossaryTerm> {

    public RelatedToBuilderFromDatasetGlossaryTerm() {
        super(DatasetGlossaryTerm.class);
    }

    @Nonnull
    @Override
    public List<GraphBuilder.RelationshipUpdates> buildRelationships(@Nonnull Urn urn, @Nonnull DatasetGlossaryTerm datasetGlossaryTerm) {

        final List<RelatedTo> relatedTo = Collections.singletonList(new RelatedTo().setSource(urn).setDestination(datasetGlossaryTerm.getGlossaryTermUrn()));
        return Collections.singletonList(new GraphBuilder.RelationshipUpdates(relatedTo, REMOVE_ALL_EDGES_FROM_SOURCE));
    }
}
