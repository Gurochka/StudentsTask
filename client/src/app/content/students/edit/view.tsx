import React from 'react';
import { Typography } from '@material-ui/core';

import { StudentForm } from '../form';
import { IStateProps } from './model';

export const View = (props: IStateProps) => {
    return (
        <>
            <Typography variant="h5" className="pt-3 pl-2">Edit Student</Typography>
            <StudentForm onSave={props.onEdit} student={props.student}/>
        </>
    );
};
