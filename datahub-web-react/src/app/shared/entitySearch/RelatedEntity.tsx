import React from 'react';
import { List, Typography, Divider } from 'antd';
import styled from 'styled-components';

import { EntityType } from '../../../types.generated';
import { useEntityRegistry } from '../../useEntityRegistry';
import { PreviewType } from '../../entity/Entity';

type Props = {
    searchResult: { [key in EntityType]?: any[] };
    entityPath?: string;
};

const ListContainer = styled.div`
    display: default;
    flex-grow: default;
`;

const TitleContainer = styled.div`
    margin-bottom: 30px;
`;

const ListItem = styled.div`
    margin: 40px;
`;

export default ({ searchResult, entityPath }: Props) => {
    const entityRegistry = useEntityRegistry();
    const entityType = entityRegistry.getTypeFromPathName(entityPath || '');
    console.log(searchResult);

    if (!entityType) return null;

    const entitiesToShow = searchResult[entityType] || [];

    return (
        <ListContainer>
            <TitleContainer>
                <Typography.Title level={3}>Related {entityRegistry.getCollectionName(entityType)}</Typography.Title>
                <Divider />
            </TitleContainer>
            <List
                dataSource={entitiesToShow}
                renderItem={(item) => {
                    return (
                        <ListItem>
                            {entityRegistry.renderPreview(entityType, PreviewType.PREVIEW, item)}
                            <Divider />
                        </ListItem>
                    );
                }}
            />
        </ListContainer>
    );
};
