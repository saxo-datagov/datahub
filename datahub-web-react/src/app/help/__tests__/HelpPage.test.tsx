import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Route } from 'react-router';

import { HelpPage } from '../HelpPage';
import TestPageContainer from '../../../utils/test-utils/TestPageContainer';
import { mocks } from '../../../Mocks';
import { PageRoutes } from '../../../conf/Global';

describe('HelpPage', () => {
    it('renders', () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TestPageContainer initialEntries={['/help']}>
                    <Route path={PageRoutes.HELP} render={() => <HelpPage />} />
                </TestPageContainer>
            </MockedProvider>,
        );
    });

    it('displays data', () => {
        const { getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TestPageContainer initialEntries={['/help']}>
                    <Route path={PageRoutes.HELP} render={() => <HelpPage />} />
                </TestPageContainer>
            </MockedProvider>,
        );
        expect(getByText('Dataset for which we want to see the metadata details.')).toBeInTheDocument();
        expect(getByText('Business Term')).toBeInTheDocument();
    });
});
