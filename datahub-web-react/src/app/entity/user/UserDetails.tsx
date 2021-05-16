import React from 'react';
import { EntityType } from '../../../types.generated';
import EntitySearchResult from '../../shared/entitySearch/EntitySearchResult';

type Props = {
    ownerships: { [key in EntityType]?: any[] };
};

export default function UserDetails({ ownerships }: Props) {
    return <EntitySearchResult searchResult={ownerships} />;
}
