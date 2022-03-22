import { Typography } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import StripMarkdownText from '../../shared/components/styled/StripMarkdownText';
import { SidebarHeader } from '../../shared/containers/profile/sidebar/SidebarHeader';
import { useEntityData, useRouteToTab } from '../../shared/EntityContext';
import analytics, { EventType } from '../../../analytics';
import useUserParams from '../../../shared/entitySearch/routingUtils/useUserParams';
import { EntityType } from '../../../../types.generated';

const DescriptionTypography = styled(Typography.Paragraph)`
    max-width: 65ch;
`;

export default function GlossarySidebarAboutSection() {
    const { entityData }: any = useEntityData();
    const { urn } = useUserParams();
    const description = entityData?.glossaryTermInfo?.definition;
    const source = entityData?.glossaryTermInfo?.sourceRef;
    const sourceUrl = entityData?.glossaryTermInfo?.sourceUrl;
    const routeToTab = useRouteToTab();
    const glossaryTermHierarchicalName = entityData?.hierarchicalName;
    const entityType = EntityType.GlossaryTerm;
    useEffect(() => {
        if (glossaryTermHierarchicalName) {
            analytics.event({
                type: EventType.GlossaryTermViewEvent,
                entityType,
                entityUrn: urn,
                glossary_term_name: glossaryTermHierarchicalName || '',
            });
        }
    }, [entityType, urn, glossaryTermHierarchicalName]);
    return (
        <div>
            <SidebarHeader title="About" />
            {description && (
                <DescriptionTypography>
                    <StripMarkdownText
                        limit={205}
                        readMore={
                            <Typography.Link onClick={() => routeToTab({ tabName: 'Documentation' })}>
                                Read More
                            </Typography.Link>
                        }
                    >
                        {description}
                    </StripMarkdownText>
                </DescriptionTypography>
            )}

            <SidebarHeader title="Source" />
            {source && (
                <DescriptionTypography>
                    {sourceUrl ? (
                        <a href={sourceUrl} target="_blank" rel="noreferrer">
                            {source}
                        </a>
                    ) : (
                        <p>{source}</p>
                    )}
                </DescriptionTypography>
            )}
        </div>
    );
}
