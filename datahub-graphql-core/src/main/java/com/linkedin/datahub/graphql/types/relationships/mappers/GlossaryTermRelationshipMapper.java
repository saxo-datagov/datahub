package com.linkedin.datahub.graphql.types.relationships.mappers;

import com.linkedin.datahub.graphql.generated.DataFlowDataJobsRelationships;
import com.linkedin.datahub.graphql.generated.GlossaryTermRelationships;
import com.linkedin.datahub.graphql.types.mappers.ModelMapper;
import javax.annotation.Nonnull;
import java.util.stream.Collectors;

public class GlossaryTermRelationshipMapper implements
        ModelMapper<com.linkedin.common.EntityRelationships, GlossaryTermRelationships> {

    public static final GlossaryTermRelationshipMapper INSTANCE = new GlossaryTermRelationshipMapper();

    public static GlossaryTermRelationships map(
            @Nonnull final com.linkedin.common.EntityRelationships relationships) {
        return INSTANCE.apply(relationships);
    }

    @Override
    public GlossaryTermRelationships apply(com.linkedin.common.EntityRelationships input) {
        final GlossaryTermRelationships result = new GlossaryTermRelationships();
        result.setEntities(input.getEntities().stream().map(
                EntityRelationshipMapper::map
        ).collect(Collectors.toList()));
        return result;
    }
}
