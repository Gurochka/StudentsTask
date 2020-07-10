import React from 'react';
import { TextField } from '@material-ui/core';

export const View = ({ input, meta, children, ...custom }: any) => (
    <TextField {...input} {...custom} error={meta.invalid && meta.dirty} helperText={meta.error} >
        {children}
    </TextField>
);
