package com.linkedin.metadata.resources.dataset;

import com.linkedin.dataset.DatasetFieldGlossaryTerm;
import com.linkedin.parseq.Task;
import com.linkedin.restli.server.CreateResponse;
import com.linkedin.restli.server.annotations.RestLiCollection;
import com.linkedin.restli.server.annotations.RestMethod;

import javax.annotation.Nonnull;


/**
 * Rest.li entry point: /datasets/{datasetKey}/fieldGlossaryTerm
 */
@RestLiCollection(name = "fieldGlossaryTerm", namespace = "com.linkedin.dataset", parent = Datasets.class)
public final class FieldGlossaryTermsResource extends BaseDatasetVersionedAspectResource<DatasetFieldGlossaryTerm> {

    public FieldGlossaryTermsResource() {
        super(DatasetFieldGlossaryTerm.class);
    }

    @Nonnull
    @Override
    @RestMethod.Get
    public Task<DatasetFieldGlossaryTerm> get(@Nonnull Long version) {
        return super.get(version);
    }

    @Nonnull
    @Override
    @RestMethod.Create
    public Task<CreateResponse> create(@Nonnull DatasetFieldGlossaryTerm datasetFieldGlossaryTerm) {
        return super.create(datasetFieldGlossaryTerm);
    }
}