import Feature from './Feature';

const mapExportColumnsFromFeature = {
    [Feature.BusinessGlossary]: {
        Headers: [
            { label: 'Origin', key: 'origin' },
            { label: 'Dataset Name', key: 'name' },
        ],
        Filename: 'Glossary.csv',
    },
    [Feature.Dataset]: {
        Headers: [
            { label: 'Origin', key: 'origin' },
            { label: 'Dataset Name', key: 'name' },
            { label: 'Description', key: 'description' },
            { label: 'Domain', key: 'domain' },
        ],
        Filename: 'Dataset.csv',
    },
};

export default mapExportColumnsFromFeature;
