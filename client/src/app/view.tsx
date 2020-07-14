import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Box, Paper } from '@material-ui/core';

import { ResourceProvider } from './shared/components/resourceProvider';
import { RouterContent } from './routes';
import { store, history } from '../redux/store';
import { Notifier } from './shared/components/notifier';

export const View = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ResourceProvider>
                    <Box width="50%" mx="auto" my={5}>
                        <Paper elevation={3} className="p-3">
                            { RouterContent }
                        </Paper>
                    </Box>
                    <Notifier />
                </ResourceProvider>
            </ConnectedRouter>
        </Provider>
    );
};
