import React from 'react';
import { Typography, Box, Button, CircularProgress } from '@material-ui/core';

import { StudentForm } from '../form';
import { IStateProps } from './model';

export const View = (props: IStateProps) => {
    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" className="pt-3 pl-2">Edit Student</Typography>
                <Button color="secondary" onClick={props.onDelete}>Delete Student</Button>
            </Box>
            {
                !props.student && (
                    <div className="d-flex justify-content-center mb-3">
                        <CircularProgress color="secondary" />
                    </div>
                )
            }
            {
                props.student && <StudentForm onSave={props.onEdit} student={props.student} />
            }
        </>
    );
};
