import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Box, Paper, CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import luxon from 'luxon';
import { ThemeProvider } from '@material-ui/styles';

import { ResourceProvider } from './shared/components/resourceProvider';
import { RouterContent } from './routing';
import { store, history } from '../redux/store';
import { HttpWrapper } from './shared/httpWrapper';
import { materialUiTheme } from '../styles/materialUI';
import { useStyles } from './styles';

export const View = () => {
    const styles = useStyles();
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ResourceProvider>
                    <ThemeProvider theme={materialUiTheme}>
                        <MuiPickersUtilsProvider utils={LuxonUtils} libInstance={luxon}>
                            <CssBaseline />
                            <Box className={styles.root}>
                                <Paper elevation={3} className="p-3">
                                    { RouterContent }
                                </Paper>
                            </Box>
                            <HttpWrapper />
                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                </ResourceProvider>
            </ConnectedRouter>
        </Provider>
    );
};
