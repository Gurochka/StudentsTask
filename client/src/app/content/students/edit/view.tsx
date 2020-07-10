import React from 'react';
import { Typography, Box, CircularProgress } from '@material-ui/core';

import { LoadingButton } from '../../../shared/components/loadingButton';
import { StudentForm } from '../form';
import { IStateProps } from './model';

export const View = ({ deleting, onDelete, ...props}: IStateProps) => {
    return (
        <>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" className="pt-3 pl-2">Edit Student</Typography>
                <LoadingButton color="secondary" onClick={onDelete} loading={deleting} disabled={deleting}>
                    Delete Student
                </LoadingButton>
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
