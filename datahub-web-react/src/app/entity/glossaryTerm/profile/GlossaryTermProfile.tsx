import { Alert } from 'antd';
import React, { useMemo } from 'react';
import { useGetGlossaryTermQuery } from '../../../../graphql/glossaryTerm.generated';
import { EntityType, GlossaryTerm, SearchResult } from '../../../../types.generated';
import { useGetEntitySearchResults } from '../../../../utils/customGraphQL/useGetEntitySearchResults';
import { EntityProfile } from '../../../shared/EntityProfile';
import RelatedEntityResults from '../../../shared/entitySearch/RelatedEntityResults';
import useUserParams from '../../../shared/entitySearch/routingUtils/useUserParams';
import { Message } from '../../../shared/Message';
import { useEntityRegistry } from '../../../useEntityRegistry';
import { Properties as PropertiesView } from '../../shared/Properties';
import GlossayRelatedTerms from './GlossaryRelatedTerms';
import GlossaryTermHeader from './GlossaryTermHeader';
import SchemaView from './SchemaView';

const messageStyle = { marginTop: '10%' };

export enum TabType {
    RelatedEntity = 'Related Entities',
    RelatedGlossaryTerms = 'Related Terms',
    Schema = 'Schema',
    Properties = 'Properties',
}

const ENABLED_TAB_TYPES = [TabType.Properties, TabType.RelatedEntity, TabType.RelatedGlossaryTerms, TabType.Schema];

export default function GlossaryTermProfile() {
    const { urn } = useUserParams();
    const { loading, error, data } = useGetGlossaryTermQuery({ variables: { urn } });

    const entityRegistry = useEntityRegistry();
    const searchTypes = entityRegistry.getSearchEntityTypes();
    searchTypes.splice(searchTypes.indexOf(EntityType.GlossaryTerm), 1);

    const glossaryTermHierarchicalName = data?.glossaryTerm?.hierarchicalName;
    const termSearchResult = useGetEntitySearchResults(
        {
            query: `glossaryTerms:"${glossaryTermHierarchicalName}"`,
        },
        searchTypes,
    );

    const fieldTermSearchResult = useGetEntitySearchResults(
        {
            query: `fieldGlossaryTerms:"${glossaryTermHierarchicalName}"`,
        },
        searchTypes,
    );

    const contentLoading =
        Object.keys(termSearchResult).some((type) => {
            return termSearchResult[type].loading;
        }) ||
        Object.keys(fieldTermSearchResult).some((type) => {
            return termSearchResult[type].loading;
        }) ||
        loading;

    const entitySearchForDetails = useMemo(() => {
        const filteredSearchResult: {
            [key in EntityType]?: Array<SearchResult>;
        } = {};

        Object.keys(termSearchResult).forEach((type) => {
            const entities = termSearchResult[type].data?.search?.searchResults;
            if (entities && entities.length > 0) {
                filteredSearchResult[type] = entities;
            }
        });

        Object.keys(fieldTermSearchResult).forEach((type) => {
            const entities = fieldTermSearchResult[type].data?.search?.searchResults;
            if (entities && entities.length > 0) {
                if (filteredSearchResult[type]) {
                    filteredSearchResult[type] = [...filteredSearchResult[type], ...entities];
                } else {
                    filteredSearchResult[type] = entities;
                }
            }
        });
        return filteredSearchResult;
    }, [termSearchResult, fieldTermSearchResult]);

    const getTabs = ({ glossaryTermInfo, glossaryRelatedTerms }: GlossaryTerm) => {
        return [
            {
                name: TabType.RelatedEntity,
                path: TabType.RelatedEntity.toLocaleLowerCase(),
                content: <RelatedEntityResults searchResult={entitySearchForDetails} />,
            },
            {
                name: TabType.RelatedGlossaryTerms,
                path: TabType.RelatedGlossaryTerms.toLocaleLowerCase(),
                content: <GlossayRelatedTerms glossaryRelatedTerms={glossaryRelatedTerms || {}} />,
            },
            {
                name: TabType.Schema,
                path: TabType.Schema.toLocaleLowerCase(),
                content: <SchemaView rawSchema={glossaryTermInfo.rawSchema || ''} />,
            },
            {
                name: TabType.Properties,
                path: TabType.Properties.toLocaleLowerCase(),
                content: <PropertiesView properties={glossaryTermInfo.customProperties || []} />,
            },
        ].filter((tab) => ENABLED_TAB_TYPES.includes(tab.name));
    };

    const getHeader = ({ glossaryTermInfo, ownership }: GlossaryTerm) => {
        return (
            <GlossaryTermHeader
                sourceRef={glossaryTermInfo?.sourceRef || ''}
                sourceUrl={glossaryTermInfo?.sourceUrl as string}
                definition={glossaryTermInfo.definition}
                ownership={ownership}
            />
        );
    };

    if (error || (!loading && !error && !data)) {
        return <Alert type="error" message={error?.message || 'Entity failed to load'} />;
    }

    return (
        <>
            {contentLoading && <Message type="loading" content="Loading..." style={messageStyle} />}
            {data && data.glossaryTerm && (
                <EntityProfile
                    title={data.glossaryTerm.name}
                    tags={null}
                    header={getHeader(data?.glossaryTerm as GlossaryTerm)}
                    tabs={getTabs(data.glossaryTerm as GlossaryTerm)}
                />
            )}
        </>
    );
}
