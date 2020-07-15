import React from 'react';
import { FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';

import { IModel } from './model';

export const View = ({ input, id, className, children, label, meta, ...custom }: IModel) => (
    <FormControl className={ className }>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Select {...input} {...custom} error={meta.invalid && meta.touched}>
            {children}
        </Select>
        { meta.touched && meta.invalid && <FormHelperText>{meta.error?.error}</FormHelperText> }
    </FormControl>
);
