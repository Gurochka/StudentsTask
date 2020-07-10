import React from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogContent, Button, DialogActions } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import { LoadingButton } from '../loadingButton';
import { IStateProps } from './model';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const View = (props: IStateProps) => (
    <Dialog open={props.show} TransitionComponent={Transition} keepMounted onClose={props.onClose}>
        { props.title && <DialogTitle>{props.title}</DialogTitle> }
        <DialogContent>
            <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <LoadingButton loading={props.agreed} onClick={props.onClickAgree}>
                Yes, do it
            </LoadingButton>
            <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
);
