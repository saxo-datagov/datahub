import SearchDatasetExcel from './SearchDatasetExcel';
import BrowseDatasetExcel from './BrowseDatasetExcel';
import Feature from '../Feature';
import { EntityType, FacetFilterInput } from '../../../../types.generated';

export default function getExcelComponent({
    feature,
    type,
    rootPath,
    totalResults,
    filters,
    page,
    query,
}: {
    feature?: Feature;
    type: EntityType;
    rootPath?: any;
    filters?: Array<FacetFilterInput>;
    query?: any;
    page?: string;
    totalResults?: number;
}) {
    if (page === 'search') {
        const excelComponent = SearchDatasetExcel({ feature, type, totalResults, query, filters });
        return excelComponent;
    }
    if (page === 'browse') {
        const excelComponent = BrowseDatasetExcel({ feature, type, totalResults, rootPath });
        return excelComponent;
    }
    return null;
}
