import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@material-ui/core';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IStateProps } from './model';

export const View = (props: IStateProps) => {
    return (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student name</TableCell>
                        <TableCell align="center">Birthdate</TableCell>
                        <TableCell align="center">Average assessment</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.students && props.students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell component="th" scope="row">
                                {student.firstname} {student.lastname}
                            </TableCell>
                            <TableCell align="center">{student.birthdate}</TableCell>
                            <TableCell align="center">{student.assessment}</TableCell>
                            <TableCell align="right">
                                <IconButton title="Edit student" onClick={() => props.onClickEdit(student)}>
                                    <EditOutlinedIcon color="primary" />
                                </IconButton>
                                <IconButton title="Delete student" onClick={() => props.onClickDelete(student.id)}>
                                    <DeleteOutlineOutlinedIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
