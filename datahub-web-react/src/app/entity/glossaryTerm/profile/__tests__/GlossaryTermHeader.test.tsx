import { render } from '@testing-library/react';
import React from 'react';
import TestPageContainer from '../../../../../utils/test-utils/TestPageContainer';
import GlossaryTermHeader from '../GlossaryTermHeader';

const glossaryTermHeaderData = {
    definition: 'this is sample definition',
    termSource: 'termSource',
    sourceRef: 'Source ref',
    fqn: 'fqn',
};

describe('Glossary Term Header', () => {
    it('renders', () => {
        const { getByText } = render(
            <TestPageContainer>
                <GlossaryTermHeader
                    definition={glossaryTermHeaderData.definition}
                    termSource={glossaryTermHeaderData.termSource}
                    sourceRef={glossaryTermHeaderData.sourceRef}
                    fqn={glossaryTermHeaderData.fqn}
                ></GlossaryTermHeader>
            </TestPageContainer>,
        );
        expect(getByText(glossaryTermHeaderData.definition)).toBeInTheDocument();
    });
});
