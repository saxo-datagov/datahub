import { UserOutlined } from '@ant-design/icons';
import * as React from 'react';
import { EntityType, BusinessTerm } from '../../../types.generated';
import { Entity, IconStyleType, PreviewType } from '../Entity';

/**
 * Definition of the DataHub BusinessTerm entity.
 */
export class BusinessTermEntity implements Entity<BusinessTerm> {
    type: EntityType = EntityType.BusinessTerm;

    icon = (fontSize: number, styleType: IconStyleType) => {
        if (styleType === IconStyleType.TAB_VIEW) {
            return <UserOutlined style={{ fontSize }} />;
        }

        if (styleType === IconStyleType.HIGHLIGHT) {
            return <UserOutlined style={{ fontSize, color: 'rgb(144 163 236)' }} />;
        }

        return (
            <UserOutlined
                style={{
                    fontSize,
                    color: '#BFBFBF',
                }}
            />
        );
    };

    isSearchEnabled = () => true;

    isBrowseEnabled = () => false;

    getAutoCompleteFieldName = () => 'name';

    getPathName: () => string = () => 'businessTerm';

    getCollectionName: () => string = () => 'BusinessTerms';

    renderProfile: (urn: string) => JSX.Element = (_) => <>profile</>;

    renderPreview = (_: PreviewType, data: BusinessTerm) => <>preview{data}</>;
}
