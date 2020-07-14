import React from 'react';
import { TextField } from '@material-ui/core';
import { IStateProps } from './model';

export const View = ({ input, meta, children, ...custom }: IStateProps) => {
    return (
        <TextField {...input} {...custom} error={meta.invalid && meta.dirty} helperText={meta.error}>
            {children}
        </TextField>
    );
};
