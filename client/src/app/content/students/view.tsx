import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@material-ui/core';

import { IModel } from './model';

export const View = (props: IModel) => {
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
                        {props.students && props.students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell component="th" scope="row">
                                    {student.firstname} {student.lastname}
                                </TableCell>
                                <TableCell align="right">{student.birthdate}</TableCell>
                                <TableCell align="right">{student.assessment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
