import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { IStateProps } from './model';

export const View = ({ children, loading, ...rest }: IStateProps) => {
    const disabled = rest.disabled === undefined ? loading : (rest.disabled || loading);
    return (
        <Button color="primary" disabled={disabled} {...rest}>
            {children}
            {
                loading && <CircularProgress color="primary" size="1rem" className="ml-3" />
            }
        </Button>
    );
};
