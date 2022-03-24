import React from 'react';
import { CSVLink } from 'react-csv';
import { FileExcelFilled } from '@ant-design/icons';
import { useGetSearchResultsQuery } from '../../../../graphql/search.generated';
import { EntityType, FacetFilterInput } from '../../../../types.generated';
import mapExportColumnsFromFeature from '../mapExportColumnsFromFeature';
import Feature from '../Feature';

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
export default function SearchDatasetExcel({
    type = EntityType.Dataset,
    query,
    totalResults,
    filters,
    feature = Feature.Dataset,
}: {
    feature?: Feature;
    type?: EntityType;
    query?: any;
    totalResults?: number;
    filters?: Array<FacetFilterInput>;
}) {
    const filename = mapExportColumnsFromFeature[feature].Filename;
    const featureHeader = mapExportColumnsFromFeature[feature].Headers;
    const { data, loading } = useGetSearchResultsQuery({
        variables: {
            input: {
                type,
                query,
                start: 0,
                count: totalResults,
                filters: filters || null,
            },
        },
    });

    const excelData = data?.search?.searchResults?.map((entries) => ({
        ...entries?.entity,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        domain: entries.entity?.properties?.filter((property) => property?.key === 'domainName')?.[0]?.value,
    }));
    return (
        <>
            {!loading && (
                <CSVLink style={exportLink} data={excelData || ''} headers={featureHeader} filename={filename}>
                    Export All <FileExcelFilled />
                </CSVLink>
            )}
        </>
    );
}
