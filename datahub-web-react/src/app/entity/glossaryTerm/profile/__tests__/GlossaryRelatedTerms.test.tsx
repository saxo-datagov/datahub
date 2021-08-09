import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import TestPageContainer from '../../../../../utils/test-utils/TestPageContainer';
import GlossaryRelatedTerms from '../GlossaryRelatedTerms';
import { EntityType, GlossaryRelatedTerms as RelatedTerms } from '../../../../../types.generated';
import { mocks } from '../../../../../Mocks';

const glossaryRelatedTermData: RelatedTerms = {
    isRelatedTerms: [
        {
            urn: 'urn:li:glossaryTerm:example.glossaryterm1',
            name: 'Glossaryterm1',
            type: EntityType.GlossaryTerm,
            glossaryTermInfo: {
                definition: 'mock is a glossary term',
                termSource: 'TERM_SOURCE_SPECIFIED',
            },
        },
    ],
    hasRelatedTerms: [
        {
            urn: 'urn:li:glossaryTerm:example.glossaryterm2',
            name: 'Glossaryterm2',
            type: EntityType.GlossaryTerm,
            glossaryTermInfo: {
                definition: 'mock has a glossary term',
                termSource: 'TERM_SOURCE_SPECIFIED',
            },
        },
    ],
};

describe('Glossary Related Terms', () => {
    it('renders and print hasRelatedTerms detail by default', async () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TestPageContainer>
                    <GlossaryRelatedTerms glossaryRelatedTerms={glossaryRelatedTermData} />
                </TestPageContainer>
            </MockedProvider>,
        );
        expect(getByText('Composed Of')).toBeInTheDocument();
        expect(getByText('Defined in')).toBeInTheDocument();
        await waitFor(() => expect(getByText('has A relation glossary term 2')).toBeInTheDocument());
        await waitFor(() => expect(getByText('glossaryterm2')).toBeInTheDocument());
    });

    it('print isRelatedTerms details on click of Defined in', async () => {
        const component = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TestPageContainer>
                    <GlossaryRelatedTerms glossaryRelatedTerms={glossaryRelatedTermData} />
                </TestPageContainer>
            </MockedProvider>,
        );
        const { getByText } = component;
        component.getByTestId('isRelatedTerms').click();
        expect(getByText('Composed Of')).toBeInTheDocument();
        expect(getByText('Defined in')).toBeInTheDocument();
        await waitFor(() => expect(getByText('is A relation glossary term 1')).toBeInTheDocument());
        await waitFor(() => expect(getByText('glossaryterm1')).toBeInTheDocument());
    });
});
