import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@material-ui/core';

export const View: React.FC = () => {
    return (
        <Box width="50%" mx="auto" my={5}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student name</TableCell>
                            <TableCell align="center">Birthdate</TableCell>
                            <TableCell align="right">Average assessment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
