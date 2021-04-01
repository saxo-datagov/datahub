package com.linkedin.metadata.resources.dataset;

import com.linkedin.dataset.DatasetGlossaryTerm;
import com.linkedin.parseq.Task;
import com.linkedin.restli.server.CreateResponse;
import com.linkedin.restli.server.annotations.RestLiCollection;
import com.linkedin.restli.server.annotations.RestMethod;

import javax.annotation.Nonnull;


/**
 * Rest.li entry point: /datasets/{datasetKey}/glossaryTerm
 */
@RestLiCollection(name = "glossaryTerm", namespace = "com.linkedin.dataset", parent = Datasets.class)
public final class GlossaryTermResource extends BaseDatasetVersionedAspectResource<DatasetGlossaryTerm> {

    public GlossaryTermResource() {
        super(DatasetGlossaryTerm.class);
    }

    @Nonnull
    @Override
    @RestMethod.Get
    public Task<DatasetGlossaryTerm> get(@Nonnull Long version) {
        return super.get(version);
    }

    @Nonnull
    @Override
    @RestMethod.Create
    public Task<CreateResponse> create(@Nonnull DatasetGlossaryTerm datasetGlossaryTerm) {
        return super.create(datasetGlossaryTerm);
    }
}