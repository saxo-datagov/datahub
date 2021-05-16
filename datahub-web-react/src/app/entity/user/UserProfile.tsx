import { Divider, Alert } from 'antd';
import React from 'react';
import styled from 'styled-components';

import UserHeader from './UserHeader';
import useUserParams from '../../shared/entitySearch/routingUtils/useUserParams';
import { useGetUserQuery } from '../../../graphql/user.generated';
import { useGetAllEntitySearchResults } from '../../../utils/customGraphQL/useGetAllEntitySearchResults';
import { Message } from '../../shared/Message';
import UserDetails from './UserDetails';

const PageContainer = styled.div`
    padding: 32px 100px;
`;

const messageStyle = { marginTop: '10%' };

/**
 * Responsible for reading & writing users.
 */
export default function UserProfile() {
    const { urn } = useUserParams();
    const { loading, error, data } = useGetUserQuery({ variables: { urn } });
    const username = data?.corpUser?.username;

    const ownershipResult = useGetAllEntitySearchResults({
        query: `owners:${username}`,
    });

    const contentLoading =
        Object.keys(ownershipResult).some((type) => {
            return ownershipResult[type].loading;
        }) || loading;

    if (error || (!loading && !error && !data)) {
        return <Alert type="error" message={error?.message || 'Entity failed to load'} />;
    }

    Object.keys(ownershipResult).forEach((type) => {
        const entities = ownershipResult[type].data?.search?.entities;

        if (!entities || entities.length === 0) {
            delete ownershipResult[type];
        } else {
            ownershipResult[type] = ownershipResult[type].data?.search?.entities;
        }
    });

    return (
        <PageContainer>
            {contentLoading && <Message type="loading" content="Loading..." style={messageStyle} />}
            <UserHeader
                profileSrc={data?.corpUser?.editableInfo?.pictureLink}
                name={data?.corpUser?.info?.displayName}
                title={data?.corpUser?.info?.title}
                email={data?.corpUser?.info?.email}
                skills={data?.corpUser?.editableInfo?.skills}
                teams={data?.corpUser?.editableInfo?.teams}
            />
            <Divider />
            <UserDetails ownerships={ownershipResult} />
        </PageContainer>
    );
}
