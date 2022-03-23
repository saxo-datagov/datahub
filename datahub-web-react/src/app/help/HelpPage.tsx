import React from 'react';
import { Table, Space, Typography } from 'antd';

import { SearchablePage } from '../search/SearchablePage';
import definitionData from './DefinitionData';

type HelpTableData = {
    key: number;
    term: string;
    definition: string;
};

export const HelpPage = () => {
    const tableData: HelpTableData[] = [];

    const tableColumns = [
        {
            title: 'Term',
            dataIndex: 'term',
            render: (term: string) => term,
        },
        {
            title: 'Definition',
            dataIndex: 'definition',
            render: (definition: string) => definition,
        },
    ];

    definitionData.forEach((data, index) => {
        tableData.push({
            key: index,
            term: data.term,
            definition: data.definition,
        });
    });

    return (
        <SearchablePage>
            <Space direction="vertical" style={{ width: '100%' }} align="center">
                <Typography.Title>Definitions</Typography.Title>
                <Table style={{ whiteSpace: 'pre' }} pagination={false} columns={tableColumns} dataSource={tableData} />
            </Space>
        </SearchablePage>
    );
};
