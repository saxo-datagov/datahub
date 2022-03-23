import { Typography } from 'antd';
import React from 'react';

const suggestion = [
    'fieldGlossaryTerms:*InstrumentType_',
    'ciName=FO_TradeHubPublisher',
    'schemaFQDN=*users.proto*.0.10',
    'fieldPaths: account_type AND settlement_line',
];

const advancedSearchConfluenceLink = 'https://wiki/pages/viewpage.action?spaceKey=EPE&title=Metadata+Search+Strategy';
export const AdvancedSearch = () => {
    return (
        <div>
            <h3 style={{ color: 'white' }}>Advanced Search</h3>
            <Typography.Paragraph style={{ color: 'white' }}>
                Below are the few queries which you can try searching for
            </Typography.Paragraph>
            {suggestion.map((item) => {
                return (
                    <Typography.Text code style={{ color: 'white' }}>
                        {item}
                        <br />
                    </Typography.Text>
                );
            })}
            <br />
            <Typography.Link href={advancedSearchConfluenceLink} target="_blank">
                View More
            </Typography.Link>
        </div>
    );
};
