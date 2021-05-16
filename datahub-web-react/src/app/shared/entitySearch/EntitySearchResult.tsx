import { Menu } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { EntityType } from '../../../types.generated';
// import { navigateToSubviewUrl } from './routingUtils/navigateToSubviewUrl';
import { Subview } from '../../entity/user/Subview';
import { useEntityRegistry } from '../../useEntityRegistry';
import EntityOwnership from './RelatedEntity';

const MenuWrapper = styled.div`
    border: 2px solid #f5f5f5;
`;

const Content = styled.div`
    margin-left: 32px;
    flex-grow: 1;
`;

const DetailWrapper = styled.div`
    display: inline-flex;
    width: 100%;
`;

type Props = {
    searchResult: { [key in EntityType]?: any[] };
};

export default function EntitySearchResult({ searchResult }: Props) {
    const entityRegistry = useEntityRegistry();
    const ownershipMenuOptions: Array<EntityType> = Object.keys(searchResult) as Array<EntityType>;
    const [selectedKey, setSelectedKey] = useState('dataset');
    const subviews = Object.values(Subview);

    const onMenuClick = ({ key }) => {
        setSelectedKey(key);
    };

    return (
        <DetailWrapper>
            <MenuWrapper>
                <Menu
                    selectable={false}
                    mode="inline"
                    style={{ width: 256 }}
                    openKeys={subviews}
                    selectedKeys={[selectedKey]}
                    onClick={(key) => {
                        onMenuClick(key);
                    }}
                >
                    {ownershipMenuOptions.map((option) => (
                        <Menu.Item key={entityRegistry.getPathName(option)}>
                            {entityRegistry.getCollectionName(option)}
                        </Menu.Item>
                    ))}
                </Menu>
            </MenuWrapper>
            <Content>
                <EntityOwnership searchResult={searchResult} entityPath={selectedKey} />
            </Content>
        </DetailWrapper>
    );
}
