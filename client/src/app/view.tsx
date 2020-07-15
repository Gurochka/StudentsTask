import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Box, Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import luxon from 'luxon';

import { ResourceProvider } from './shared/components/resourceProvider';
import { RouterContent } from './routes';
import { store, history } from '../redux/store';
import { HttpWrapper } from './shared/httpWrapper';

export const View = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ResourceProvider>
                    <MuiPickersUtilsProvider utils={LuxonUtils} libInstance={luxon}>
                        <Box width="50%" mx="auto" my={5}>
                            <Paper elevation={3} className="p-3">
                                { RouterContent }
                            </Paper>
                        </Box>
                        <HttpWrapper />
                    </MuiPickersUtilsProvider>
                </ResourceProvider>
            </ConnectedRouter>
        </Provider>
    );
};
