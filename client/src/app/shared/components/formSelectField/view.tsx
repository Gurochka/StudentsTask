import React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';

import { IModel } from './model';

export const View = ({ input, id, className, children, label, ...custom }: IModel) => (
    <FormControl className={ className }>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select {...input} {...custom}>
            {children}
        </Select>
    </FormControl>
);
