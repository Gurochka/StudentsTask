import React from 'react';
import { Snackbar, IconButton, SnackbarOrigin, Box, Paper, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { IStateProps } from './model';

export const View = (props: IStateProps) => {
    const anchorOrigin: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'right'
    };

    return (
        <Snackbar
            open={props.open}
            onClose={props.onClose}
            anchorOrigin={anchorOrigin}
        >
            <Box bgcolor={`${props.notifyOptions?.type}.main`} color="background.paper" px={3} py={1} component={Paper}>
                <div className="d-flex justify-content-between align-items-center">
                    <Typography variant="body2" className="mr-5">{props.notifyOptions?.message}</Typography>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            </Box>
        </Snackbar>
    );
};
