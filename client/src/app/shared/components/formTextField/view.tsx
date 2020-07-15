import React from 'react';
import { TextField } from '@material-ui/core';
import { IStateProps } from './model';

export const View = ({ input, meta, children, ...custom }: IStateProps) => (
    <TextField {...input} {...custom} error={meta.invalid && meta.touched} helperText={meta.touched && meta.error?.error}>
        {children}
    </TextField>
);
