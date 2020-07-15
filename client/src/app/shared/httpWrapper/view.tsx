import * as React from 'react';
import { MessageState } from '../../../redux/reducers/httpWrapper/message';
import { Snackbar, IconButton, SnackbarOrigin, Box, Paper, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export interface IModel {
    message: MessageState;
    onClose: () => void;
}

export const View = (props: IModel) => {
    const anchorOrigin: SnackbarOrigin = {
        vertical: 'top',
        horizontal: 'right'
    };
    const { message } = props;

    return (
        <Snackbar
            open={!!message}
            onClose={props.onClose}
            anchorOrigin={anchorOrigin}
        >
            <Box bgcolor={`${message?.type}.main`} color="background.paper" px={3} py={1} component={Paper}>
                <div className="d-flex justify-content-between align-items-center">
                    <Typography variant="body2" className="mr-5">{message?.message}</Typography>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={props.onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>
            </Box>
        </Snackbar>
    );
};
