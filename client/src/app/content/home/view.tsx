import React from 'react';
import { Paper, Box, Button, Typography } from '@material-ui/core';
import { Students } from '../students/list';
import AddIcon from '@material-ui/icons/Add';

export const View = () => {
    return (
        <Box width="50%" mx="auto" my={5}>
            <Paper elevation={3} className="p-3">
                <div className="d-flex pl-3 py-3 justify-content-between align-items-center">
                    <Typography variant="h5">Students Performance</Typography>
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="medium"
                        startIcon={<AddIcon />}
                        title="Add new student"
                    >
                        Add
                    </Button>
                </div>

                <Students />
            </Paper>
        </Box>
    );
};
