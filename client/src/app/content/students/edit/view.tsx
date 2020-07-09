import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';

import { StudentForm } from '../form';
import { IStateProps } from './model';

export const View = (props: IStateProps) => {
    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" className="pt-3 pl-2">Edit Student</Typography>
                <Button color="secondary" onClick={props.onDelete}>Delete Student</Button>
            </Box>
            <StudentForm onSave={props.onEdit} student={props.student}/>
        </>
    );
};
