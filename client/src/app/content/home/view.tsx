import React from 'react';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Students } from '../students/list';
import { IProps } from './model';

export const View = (props: IProps) => {
    return (
        <>
            <div className="d-flex pl-3 py-3 justify-content-between align-items-center">
                <Typography variant="h5">Students Performance</Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    startIcon={<AddIcon />}
                    title="Add new student"
                    onClick={props.onClickAdd}
                >
                    Add
                </Button>
            </div>

            <Students />
        </>
    );
};
