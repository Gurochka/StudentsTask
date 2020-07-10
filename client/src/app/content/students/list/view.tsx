import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress } from '@material-ui/core';

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { IStateProps } from './model';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

import { Prompt } from '../../../shared/components/prompt';

export const View = (props: IStateProps) => {
    const { studentToRemove } = props;

    return (
        <>
            <Prompt
                content= {`Do you want to remove user ${studentToRemove?.firstname} ${studentToRemove?.lastname}?`}
                show={!!studentToRemove}
                onAgree={props.deleteStudent}
                onClose={props.closePrompt}
            />
            {
                !props.students && (
                    <div className="d-flex justify-content-center mb-3">
                        <CircularProgress color="secondary" />
                    </div>
                )
            }
            {
                props.students && (
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
                                {
                                    props.students.map((student: StudentViewModel) => (
                                        <TableRow key={student.id}>
                                            <TableCell component="th" scope="row">
                                                {student.firstname} {student.lastname}
                                            </TableCell>
                                            <TableCell align="center">{student.birthdate}</TableCell>
                                            <TableCell align="center">{student.assessment}</TableCell>
                                            <TableCell align="right">
                                                <IconButton title="Edit student" onClick={() => props.onClickEdit(student.id)}>
                                                    <EditOutlinedIcon color="primary" />
                                                </IconButton>
                                                <IconButton title="Delete student" onClick={() => props.onClickDelete(student)}>
                                                    <DeleteOutlineOutlinedIcon color="primary" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                {
                                    props.students.length === 0 && (
                                        <TableRow>
                                            <TableCell align="center" colSpan={4}>No students found</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </>
    );
};
