package com.linkedin.metadata.builders.graph.relationship;


import com.linkedin.common.urn.Urn;
import com.linkedin.dataset.DatasetFieldGlossaryTerm;
import com.linkedin.metadata.builders.graph.GraphBuilder;
import com.linkedin.metadata.relationship.RelatedTo;

import javax.annotation.Nonnull;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.linkedin.metadata.dao.internal.BaseGraphWriterDAO.RemovalOption.REMOVE_ALL_EDGES_FROM_SOURCE;


public class RelatedToBuilderFromDatasetFieldGlossaryTerm extends BaseRelationshipBuilder<DatasetFieldGlossaryTerm> {

    public RelatedToBuilderFromDatasetFieldGlossaryTerm() {
        super(DatasetFieldGlossaryTerm.class);
    }

    @Nonnull
    @Override
    public List<GraphBuilder.RelationshipUpdates> buildRelationships(@Nonnull Urn urn, @Nonnull DatasetFieldGlossaryTerm datasetFieldGlossaryTerm) {

        final List<RelatedTo> relatedTo = datasetFieldGlossaryTerm.getFieldMappings().stream()
                .map(fieldGlossaryTermMapping -> new RelatedTo().setSource(fieldGlossaryTermMapping.getSourceField())
                        .setDestination(fieldGlossaryTermMapping.getGlossaryTermUrn()))
                .collect(Collectors.toList());
        return Collections.singletonList(new GraphBuilder.RelationshipUpdates(relatedTo, REMOVE_ALL_EDGES_FROM_SOURCE));
    }
}
