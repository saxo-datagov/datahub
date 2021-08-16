package com.linkedin.datahub.graphql.types.lineage;
import com.linkedin.datahub.graphql.QueryContext;
import com.linkedin.datahub.graphql.generated.DataFlowDataJobsRelationships;
import com.linkedin.datahub.graphql.generated.GlossaryTermRelationships;
import com.linkedin.datahub.graphql.types.relationships.mappers.GlossaryTermRelationshipMapper;
import com.linkedin.lineage.client.Relationships;
import com.linkedin.metadata.query.RelationshipDirection;

import com.linkedin.datahub.graphql.types.LoadableType;

import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;
import com.linkedin.r2.RemoteInvocationException;

public class GlossaryTermsRelationshipsType implements LoadableType<GlossaryTermRelationships> {
    private final Relationships _relationshipsClient;
    private final RelationshipDirection _direction =  RelationshipDirection.OUTGOING;
    private final String _relationshipType;

    public GlossaryTermsRelationshipsType(final Relationships relationshipsClient, final String relationshipType) {
        _relationshipsClient = relationshipsClient;
        _relationshipType = relationshipType;
    }

    @Override
    public Class<GlossaryTermRelationships> objectClass() {
        return GlossaryTermRelationships.class;
    }

    @Override
    public List<GlossaryTermRelationships> batchLoad(final List<String> keys, final QueryContext context) {

        try {
            return keys.stream().map(urn -> {
                try {
                    com.linkedin.common.EntityRelationships relationships =
                            _relationshipsClient.getRelationships(urn, _direction, _relationshipType);
                    System.out.println("relationships is " + relationships.toString());
                    return GlossaryTermRelationshipMapper.map(relationships);
                } catch (RemoteInvocationException | URISyntaxException e) {
                    throw new RuntimeException(String.format("Failed to batch load DataJobs for DataFlow %s", urn), e);
                }
            }).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Failed to batch load DataJobs for DataFlow", e);
        }
    }
}
