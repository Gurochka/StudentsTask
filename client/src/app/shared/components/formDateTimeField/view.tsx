import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { IStateProps } from './model';

export const View = ({ value, meta, onChange, ...custom }: IStateProps) => (
    <KeyboardDatePicker error={meta.invalid && meta.touched} {...custom} format="yyyy-MM-dd"
        value={value} onChange={onChange} helperText={meta.touched && meta.error?.error} />
);
