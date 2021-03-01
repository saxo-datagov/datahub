import { GetDatasetDocument, UpdateDatasetDocument } from './graphql/dataset.generated';
import { GetBrowsePathsDocument, GetBrowseResultsDocument } from './graphql/browse.generated';
import {
    GetAutoCompleteResultsDocument,
    GetSearchResultsDocument,
    GetSearchResultsQuery,
} from './graphql/search.generated';
import { LoginDocument } from './graphql/auth.generated';
import { GetUserDocument } from './graphql/user.generated';
import { Dataset, EntityType } from './types.generated';

const user1 = {
    username: 'sdas',
    urn: 'urn:li:corpuser:2',
    type: EntityType.CorpUser,
    info: {
        email: 'sdas@domain.com',
        active: true,
        displayName: 'sdas',
        title: 'Software Engineer',
        firstName: 'Shirshanka',
        lastName: 'Das',
        fullName: 'Shirshanka Das',
    },
    editableInfo: {
        pictureLink: 'https://crunchconf.com/img/2019/speakers/1559291783-ShirshankaDas.png',
    },
};

const user2 = {
    username: 'john',
    urn: 'urn:li:corpuser:3',
    type: EntityType.CorpUser,
    info: {
        email: 'john@domain.com',
        active: true,
        displayName: 'john',
        title: 'Eng',
        firstName: 'John',
        lastName: 'Joyce',
        fullName: 'John Joyce',
    },
    editableInfo: {
        pictureLink: null,
    },
};

const dataset1 = {
    upstreamLineage: {
        __typename: 'UpstreamLineage',
        upstreams: [
            {
                __typename: 'RelatedDataset',
                dataset: {
                    __typename: 'Dataset',
                    urn: 'urn:li:dataset:(urn:li:dataPlatform:kafka,SampleKafkaDataset,PROD)',
                    name: 'SampleKafkaDataset',
                    type: 'DATASET',
                    origin: 'PROD',
                    description: '',
                    uri: null,
                    platform: {
                        __typename: 'DataPlatform',
                        name: 'kafka',
                    },
                    platformNativeType: null,
                    tags: [],
                    properties: null,
                    ownership: {
                        __typename: 'Ownership',
                        owners: [
                            {
                                __typename: 'Owner',
                                owner: {
                                    __typename: 'CorpUser',
                                    urn: 'urn:li:corpuser:jdoe',
                                    type: 'CORP_USER',
                                    username: 'jdoe',
                                    info: {
                                        __typename: 'CorpUserInfo',
                                        active: true,
                                        displayName: 'John Doe',
                                        title: 'Software Engineer',
                                        email: 'jdoe@linkedin.com',
                                        firstName: null,
                                        lastName: null,
                                        fullName: 'John Doe',
                                    },
                                    editableInfo: null,
                                },
                                type: 'DATAOWNER',
                            },
                            {
                                __typename: 'Owner',
                                owner: {
                                    __typename: 'CorpUser',
                                    urn: 'urn:li:corpuser:datahub',
                                    type: 'CORP_USER',
                                    username: 'datahub',
                                    info: {
                                        __typename: 'CorpUserInfo',
                                        active: true,
                                        displayName: 'Data Hub',
                                        title: 'CEO',
                                        email: 'datahub@linkedin.com',
                                        firstName: null,
                                        lastName: null,
                                        fullName: 'Data Hub',
                                    },
                                    editableInfo: {
                                        __typename: 'CorpUserEditableInfo',
                                        pictureLink:
                                            'https://raw.githubusercontent.com/linkedin/datahub/master/datahub-web/packages/data-portal/public/assets/images/default_avatar.png',
                                    },
                                },
                                type: 'DATAOWNER',
                            },
                        ],
                        lastModified: {
                            __typename: 'AuditStamp',
                            time: 1581407189000,
                        },
                    },
                    institutionalMemory: {
                        __typename: 'InstitutionalMemory',
                        elements: [
                            {
                                __typename: 'InstitutionalMemoryMetadata',
                                url: 'https://www.linkedin.com',
                                author: 'urn:li:corpuser:jdoe',
                                description: 'Sample doc',
                                created: {
                                    __typename: 'AuditStamp',
                                    actor: 'urn:li:corpuser:jdoe',
                                    time: 1581407189000,
                                },
                            },
                        ],
                    },
                    schema: {
                        __typename: 'Schema',
                        datasetUrn: null,
                        name: 'SampleKafkaSchema',
                        platformUrn: 'urn:li:dataPlatform:kafka',
                        version: 0,
                        hash: '',
                        platformSchema: {
                            __typename: 'TableSchema',
                            schema:
                                "{'type:'record','name:'SampleKafkaSchema','namespace:'com.linkedin.dataset','doc:'Sample Kafka dataset','fields:[{'name:'field_foo','type:['string']},{'name:'field_bar','type:['boolean']}]}",
                        },
                        fields: [
                            {
                                __typename: 'SchemaField',
                                fieldPath: 'field_foo',
                                jsonPath: null,
                                nullable: false,
                                description: 'Foo field description',
                                type: 'STRING',
                                nativeDataType: 'string',
                                recursive: false,
                            },
                            {
                                __typename: 'SchemaField',
                                fieldPath: 'field_bar',
                                jsonPath: null,
                                nullable: false,
                                description: 'Bar field description',
                                type: 'BOOLEAN',
                                nativeDataType: 'boolean',
                                recursive: false,
                            },
                        ],
                        primaryKeys: null,
                    },
                    deprecation: null,
                },
                type: 'TRANSFORMED',
                created: {
                    __typename: 'AuditStamp',
                    time: 1581407189000,
                },
            },
        ],
    },
    downstreamLineage: {
        __typename: 'DownstreamLineage',
        downstreams: [
            {
                __typename: 'RelatedDataset',
                dataset: {
                    __typename: 'Dataset',
                    urn: 'urn:li:dataset:(urn:li:dataPlatform:hive,SampleHiveDataset,PROD)',
                    name: 'SampleHiveDataset',
                    type: 'DATASET',
                    origin: 'PROD',
                    description: '',
                    uri: null,
                    platform: {
                        __typename: 'DataPlatform',
                        name: 'hive',
                    },
                    platformNativeType: null,
                    tags: [],
                    properties: null,
                    ownership: {
                        __typename: 'Ownership',
                        owners: [
                            {
                                __typename: 'Owner',
                                owner: {
                                    __typename: 'CorpUser',
                                    urn: 'urn:li:corpuser:jdoe',
                                    type: 'CORP_USER',
                                    username: 'jdoe',
                                    info: {
                                        __typename: 'CorpUserInfo',
                                        active: true,
                                        displayName: 'John Doe',
                                        title: 'Software Engineer',
                                        email: 'jdoe@linkedin.com',
                                        firstName: null,
                                        lastName: null,
                                        fullName: 'John Doe',
                                    },
                                    editableInfo: null,
                                },
                                type: 'DATAOWNER',
                            },
                            {
                                __typename: 'Owner',
                                owner: {
                                    __typename: 'CorpUser',
                                    urn: 'urn:li:corpuser:datahub',
                                    type: 'CORP_USER',
                                    username: 'datahub',
                                    info: {
                                        __typename: 'CorpUserInfo',
                                        active: true,
                                        displayName: 'Data Hub',
                                        title: 'CEO',
                                        email: 'datahub@linkedin.com',
                                        firstName: null,
                                        lastName: null,
                                        fullName: 'Data Hub',
                                    },
                                    editableInfo: {
                                        __typename: 'CorpUserEditableInfo',
                                        pictureLink:
                                            'https://raw.githubusercontent.com/linkedin/datahub/master/datahub-web/packages/data-portal/public/assets/images/default_avatar.png',
                                    },
                                },
                                type: 'DATAOWNER',
                            },
                        ],
                        lastModified: {
                            __typename: 'AuditStamp',
                            time: 1581407189000,
                        },
                    },
                    institutionalMemory: {
                        __typename: 'InstitutionalMemory',
                        elements: [
                            {
                                __typename: 'InstitutionalMemoryMetadata',
                                url: 'https://www.linkedin.com',
                                author: 'urn:li:corpuser:jdoe',
                                description: 'Sample doc',
                                created: {
                                    __typename: 'AuditStamp',
                                    actor: 'urn:li:corpuser:jdoe',
                                    time: 1581407189000,
                                },
                            },
                        ],
                    },
                    schema: {
                        __typename: 'Schema',
                        datasetUrn: null,
                        name: 'SampleHiveSchema',
                        platformUrn: 'urn:li:dataPlatform:hive',
                        version: 0,
                        hash: '',
                        platformSchema: {
                            __typename: 'TableSchema',
                            schema:
                                "{'type:'record','name:'SampleHiveSchema','namespace:'com.linkedin.dataset','doc:'Sample Hive dataset','fields:[{'name:'field_foo','type:['string']},{'name:'field_bar','type:['boolean']}]}",
                        },
                        fields: [
                            {
                                __typename: 'SchemaField',
                                fieldPath: 'field_foo',
                                jsonPath: null,
                                nullable: false,
                                description: 'Foo field description',
                                type: 'STRING',
                                nativeDataType: 'string',
                                recursive: false,
                            },
                            {
                                __typename: 'SchemaField',
                                fieldPath: 'field_bar',
                                jsonPath: null,
                                nullable: false,
                                description: 'Bar field description',
                                type: 'BOOLEAN',
                                nativeDataType: 'boolean',
                                recursive: false,
                            },
                        ],
                        primaryKeys: null,
                    },
                    deprecation: null,
                },
                type: 'TRANSFORMED',
                created: {
                    __typename: 'AuditStamp',
                    time: 1581407189000,
                },
            },
        ],
    },
    urn: 'urn:li:dataset:(urn:li:dataPlatform:hdfs,SampleHdfsDataset,PROD)',
    name: 'SampleHdfsDataset11',
    type: 'DATASET',
    origin: 'PROD',
    description: '',
    uri: null,
    platform: {
        __typename: 'DataPlatform',
        name: 'hdfs',
    },
    platformNativeType: null,
    tags: [],
    properties: null,
    ownership: {
        __typename: 'Ownership',
        owners: [
            {
                __typename: 'Owner',
                owner: {
                    __typename: 'CorpUser',
                    urn: 'urn:li:corpuser:jdoe',
                    type: 'CORP_USER',
                    username: 'jdoe',
                    info: {
                        __typename: 'CorpUserInfo',
                        active: true,
                        displayName: 'John Doe',
                        title: 'Software Engineer',
                        email: 'jdoe@linkedin.com',
                        firstName: null,
                        lastName: null,
                        fullName: 'John Doe',
                    },
                    editableInfo: null,
                },
                type: 'DATAOWNER',
            },
            {
                __typename: 'Owner',
                owner: {
                    __typename: 'CorpUser',
                    urn: 'urn:li:corpuser:datahub',
                    type: 'CORP_USER',
                    username: 'datahub',
                    info: {
                        __typename: 'CorpUserInfo',
                        active: true,
                        displayName: 'Data Hub',
                        title: 'CEO',
                        email: 'datahub@linkedin.com',
                        firstName: null,
                        lastName: null,
                        fullName: 'Data Hub',
                    },
                    editableInfo: {
                        __typename: 'CorpUserEditableInfo',
                        pictureLink:
                            'https://raw.githubusercontent.com/linkedin/datahub/master/datahub-web/packages/data-portal/public/assets/images/default_avatar.png',
                    },
                },
                type: 'DATAOWNER',
            },
        ],
        lastModified: {
            __typename: 'AuditStamp',
            time: 1581407189000,
        },
    },
    institutionalMemory: {
        __typename: 'InstitutionalMemory',
        elements: [
            {
                __typename: 'InstitutionalMemoryMetadata',
                url: 'https://www.linkedin.com',
                author: 'urn:li:corpuser:jdoe',
                description: 'Sample doc',
                created: {
                    __typename: 'AuditStamp',
                    actor: 'urn:li:corpuser:jdoe',
                    time: 1581407189000,
                },
            },
        ],
    },
    schema: {
        __typename: 'Schema',
        datasetUrn: null,
        name: 'SampleHdfsSchema',
        platformUrn: 'urn:li:dataPlatform:hdfs',
        version: 0,
        hash: '',
        platformSchema: {
            __typename: 'TableSchema',
            schema:
                "{'type:'record','name:'SampleHdfsSchema','namespace:'com.linkedin.dataset','doc:'Sample HDFS dataset','fields:[{'name:'field_foo','type:['string']},{'name:'field_bar','type:['boolean']}]}",
        },
        fields: [
            {
                __typename: 'SchemaField',
                fieldPath: 'field_foo',
                jsonPath: null,
                nullable: false,
                description: 'Foo field description',
                type: 'STRING',
                nativeDataType: 'string',
                recursive: false,
            },
            {
                __typename: 'SchemaField',
                fieldPath: 'field_bar',
                jsonPath: null,
                nullable: false,
                description: 'Bar field description',
                type: 'BOOLEAN',
                nativeDataType: 'boolean',
                recursive: false,
            },
        ],
        primaryKeys: null,
    },
    deprecation: null,
};

const dataset2 = {
    urn: 'urn:li:dataset:2',
    type: EntityType.Dataset,
    platform: {
        urn: 'urn:li:dataPlatform:mysql',
        name: 'MySQL',
        type: EntityType.DataPlatform,
    },
    platformNativeType: 'TABLE',
    name: 'Some Other Dataset',
    origin: 'PROD',
    tags: ['Outdated'],
    description: 'This is some other dataset, so who cares!',
    uri: 'www.google.com',
    properties: [],
    created: {
        time: 0,
    },
    lastModified: {
        time: 0,
    },
    ownership: {
        owners: [
            {
                owner: {
                    ...user1,
                },
                type: 'DATAOWNER',
            },
            {
                owner: {
                    ...user2,
                },
                type: 'DELEGATE',
            },
        ],
        lastModified: {
            time: 0,
        },
    },
};

const dataset3 = {
    urn: 'urn:li:dataset:3',
    type: EntityType.Dataset,
    platform: {
        urn: 'urn:li:dataPlatform:kafka',
        name: 'Kafka',
        type: EntityType.DataPlatform,
    },
    platformNativeType: 'STREAM',
    name: 'Yet Another Dataset',
    origin: 'PROD',
    tags: ['Trusted'],
    description: 'This and here we have yet another Dataset (YAN). Are there more?',
    uri: 'www.google.com',
    properties: [],
    created: {
        time: 0,
    },
    lastModified: {
        time: 0,
    },
    ownership: {
        owners: [
            {
                owner: {
                    ...user1,
                },
                type: 'DATAOWNER',
            },
            {
                owner: {
                    ...user2,
                },
                type: 'DELEGATE',
            },
        ],
        lastModified: {
            time: 0,
        },
    },
} as Dataset;

/*
    Define mock data to be returned by Apollo MockProvider. 
*/
export const mocks = [
    {
        request: {
            query: LoginDocument,
            variables: {
                username: 'datahub',
                password: 'datahub',
            },
        },
        result: {
            data: {
                login: {
                    ...user1,
                },
            },
        },
    },
    {
        request: {
            query: GetDatasetDocument,
            variables: {
                urn: 'urn:li:dataset:(urn:li:dataPlatform:hdfs,SampleHdfsDataset,PROD)',
            },
        },
        result: {
            data: {
                dataset: {
                    __typename: 'Dataset',
                    ...dataset1,
                },
            },
        },
    },
    {
        request: {
            query: GetUserDocument,
            variables: {
                urn: 'urn:li:corpuser:1',
            },
        },
        result: {
            data: {
                dataset: {
                    ...user1,
                },
            },
        },
    },
    {
        request: {
            query: GetBrowsePathsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    urn: 'urn:li:dataset:1',
                },
            },
        },
        result: {
            data: {
                browsePaths: [['prod', 'hdfs', 'datasets']],
            },
        },
    },
    {
        request: {
            query: GetBrowseResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    path: [],
                    start: 0,
                    count: 20,
                    filters: null,
                },
            },
        },
        result: {
            data: {
                browse: {
                    entities: [],
                    start: 0,
                    count: 0,
                    total: 0,
                    metadata: {
                        path: [],
                        groups: [
                            {
                                name: 'prod',
                                count: 1,
                            },
                        ],
                        totalNumEntities: 1,
                    },
                },
            },
        },
    },
    {
        request: {
            query: GetBrowseResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    path: ['prod', 'hdfs'],
                    start: 0,
                    count: 20,
                    filters: null,
                },
            },
        },
        result: {
            data: {
                browse: {
                    entities: [
                        {
                            __typename: 'Dataset',
                            ...dataset1,
                        },
                    ],
                    start: 0,
                    count: 1,
                    total: 1,
                    metadata: {
                        path: ['prod', 'hdfs'],
                        groups: [],
                        totalNumEntities: 0,
                    },
                },
            },
        },
    },
    {
        request: {
            query: GetBrowseResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    path: ['prod'],
                    start: 0,
                    count: 20,
                    filters: null,
                },
            },
        },
        result: {
            data: {
                browse: {
                    entities: [],
                    start: 0,
                    count: 0,
                    total: 0,
                    metadata: {
                        path: ['prod'],
                        groups: [
                            {
                                name: 'hdfs',
                                count: 1,
                            },
                        ],
                        totalNumEntities: 1,
                    },
                },
            },
        },
    },
    {
        request: {
            query: GetAutoCompleteResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    query: 't',
                },
            },
        },
        result: {
            data: {
                autoComplete: {
                    query: 't',
                    suggestions: ['The Great Test Dataset', 'Some other test'],
                },
            },
        },
    },
    {
        request: {
            query: GetAutoCompleteResultsDocument,
            variables: {
                input: {
                    type: 'BUSINESS_TERM',
                    query: 'b',
                },
            },
        },
        result: {
            data: {
                autoComplete: {
                    query: 'b',
                    suggestions: ['business term 1', 'business term 2'],
                },
            },
        },
    },
    {
        request: {
            query: GetAutoCompleteResultsDocument,
            variables: {
                input: {
                    type: 'USER',
                    query: 'j',
                },
            },
        },
        result: {
            data: {
                autoComplete: {
                    query: 'j',
                    suggestions: ['jjoyce'],
                },
            },
        },
    },
    {
        request: {
            query: GetSearchResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    query: 'test',
                    start: 0,
                    count: 10,
                    filters: [],
                },
            },
        },
        result: {
            data: {
                search: {
                    start: 0,
                    count: 3,
                    total: 3,
                    entities: [
                        {
                            __typename: 'Dataset',
                            ...dataset1,
                        },
                        {
                            __typename: 'Dataset',
                            ...dataset2,
                        },
                        {
                            __typename: 'Dataset',
                            ...dataset3,
                        },
                    ],
                    facets: [
                        {
                            field: 'origin',
                            aggregations: [{ value: 'PROD', count: 3 }],
                        },
                        {
                            field: 'platform',
                            aggregations: [
                                { value: 'HDFS', count: 1 },
                                { value: 'MySQL', count: 1 },
                                { value: 'Kafka', count: 1 },
                            ],
                        },
                    ],
                },
            } as GetSearchResultsQuery,
        },
    },
    {
        request: {
            query: GetSearchResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    query: 'test',
                    start: 0,
                    count: 10,
                    filters: [
                        {
                            field: 'platform',
                            value: 'kafka',
                        },
                    ],
                },
            },
        },
        result: {
            data: {
                __typename: 'Query',
                search: {
                    __typename: 'SearchResults',
                    start: 0,
                    count: 1,
                    total: 1,
                    entities: [
                        {
                            __typename: 'Dataset',
                            ...dataset3,
                        },
                    ],
                    facets: [
                        {
                            field: 'origin',
                            aggregations: [
                                {
                                    value: 'PROD',
                                    count: 3,
                                },
                            ],
                        },
                        {
                            field: 'platform',
                            aggregations: [
                                { value: 'hdfs', count: 1 },
                                { value: 'mysql', count: 1 },
                                { value: 'kafka', count: 1 },
                            ],
                        },
                    ],
                },
            } as GetSearchResultsQuery,
        },
    },
    {
        request: {
            query: GetSearchResultsDocument,
            variables: {
                input: {
                    type: 'DATASET',
                    query: 'test',
                    start: 0,
                    count: 10,
                    filters: [
                        {
                            field: 'platform',
                            value: 'kafka',
                        },
                        {
                            field: 'platform',
                            value: 'hdfs',
                        },
                    ],
                },
            },
        },
        result: {
            data: {
                __typename: 'Query',
                search: {
                    __typename: 'SearchResults',
                    start: 0,
                    count: 1,
                    total: 1,
                    entities: [
                        {
                            __typename: 'Dataset',
                            ...dataset3,
                        },
                    ],
                    facets: [
                        {
                            field: 'origin',
                            aggregations: [
                                {
                                    value: 'PROD',
                                    count: 3,
                                },
                            ],
                        },
                        {
                            field: 'platform',
                            aggregations: [
                                { value: 'hdfs', count: 1 },
                                { value: 'mysql', count: 1 },
                                { value: 'kafka', count: 1 },
                            ],
                        },
                    ],
                },
            } as GetSearchResultsQuery,
        },
    },
    {
        request: {
            query: GetSearchResultsDocument,
            variables: {
                input: {
                    type: 'USER',
                    query: 'Test',
                    start: 0,
                    count: 10,
                },
            },
        },
        result: {
            data: {
                search: {
                    start: 0,
                    count: 2,
                    total: 2,
                    entities: [
                        {
                            ...user1,
                        },
                    ],
                },
            },
        },
    },
    {
        request: {
            query: UpdateDatasetDocument,
            variables: {
                input: {
                    urn: 'urn:li:dataset:1',
                    ownership: {
                        owners: [
                            {
                                owner: 'urn:li:corpuser:1',
                                type: 'DATAOWNER',
                            },
                        ],
                    },
                },
            },
        },
        result: {
            data: {
                dataset: {
                    urn: 'urn:li:corpuser:1',
                    ownership: {
                        owners: [
                            {
                                owner: {
                                    ...user1,
                                },
                                type: 'DATAOWNER',
                            },
                        ],
                        lastModified: {
                            time: 0,
                        },
                    },
                },
            },
        },
    },
];
