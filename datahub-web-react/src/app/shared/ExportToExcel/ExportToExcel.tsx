import React from 'react';
import Feature from './Feature';
import { EntityType, FacetFilterInput } from '../../../types.generated';
import getExcelComponent from './ExcelComponents/GetExcelComponent';

const ExportToExcel = ({
    feature = Feature.Dataset,
    type,
    rootPath,
    query,
    totalResults,
    filters,
    page,
}: {
    feature?: Feature;
    type: EntityType;
    rootPath?: any;
    query?: any;
    page?: string;
    filters?: Array<FacetFilterInput>;
    totalResults?: number;
}) => {
    const ExcelComponent = getExcelComponent({ feature, type, rootPath, query, totalResults, page, filters });

    return (
        <div
            style={{
                textAlign: 'right',
                padding: '10px',
                fontSize: '14px',
            }}
        >
            {ExcelComponent}
        </div>
    );
};

export default ExportToExcel;
