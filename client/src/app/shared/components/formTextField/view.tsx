import React from 'react';
import { TextField } from '@material-ui/core';

export const View = ({ input, children, ...custom }: any) => (
    <TextField {...input} {...custom} >
        {children}
    </TextField>
);
