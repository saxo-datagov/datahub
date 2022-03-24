import React from 'react';
import { CSVLink } from 'react-csv';
import { FileExcelFilled } from '@ant-design/icons';
import mapExportColumnsFromFeature from '../mapExportColumnsFromFeature';
import Feature from '../Feature';
import { useGetBrowseResultsQuery } from '../../../../graphql/browse.generated';
import { EntityType } from '../../../../types.generated';

/**
 * Fetch a CorpUser object corresponding to the currently authenticated user.
 */
const exportLink = {
    fontSize: 14,
    fontWeight: 500,
    padding: '5px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontFamily:
        "Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji",
};
export default function BrowseDatasetExcel({
    type = EntityType.Dataset,
    rootPath,
    totalResults,
    feature = Feature.Dataset,
}: {
    feature?: Feature;
    type?: EntityType;
    rootPath?: any;
    totalResults?: number;
}) {
    const { loading, data: displayData } = useGetBrowseResultsQuery({
        variables: {
            input: {
                type,
                path: rootPath.split('/').slice(3),
                start: 0,
                count: totalResults,
                filters: null,
            },
        },
    });
    const filename = mapExportColumnsFromFeature[feature].Filename;
    const featureHeader = mapExportColumnsFromFeature[feature].Headers;
    const result1 = displayData?.browse?.entities?.map((entity) => ({
        ...entity, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        domain: entity?.type,
    }));
    return (
        <>
            {' '}
            {!loading && (
                <CSVLink style={exportLink} data={result1 || ''} headers={featureHeader} filename={filename}>
                    Export All <FileExcelFilled />
                </CSVLink>
            )}
        </>
    );
}
