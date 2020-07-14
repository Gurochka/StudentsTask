import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { View } from './view';
import { IStateProps } from './model';
import { getActiveStudent, setActiveStudent, updateStudent, removeStudent } from '../../../../redux/actions/students';
import { AppDispatch } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { ActiveStudentState } from '../../../../redux/reducers/students';

export const EditStudent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const student = useSelector<AppState, ActiveStudentState>(state => state.students.active);
    const [deleting, setDeleting] = useState(false);

    const { studentId } = useParams();

    useEffect(() => {
        dispatch(getActiveStudent(studentId));
        return () => {
            dispatch(setActiveStudent(null));
        };
    }, []);

    const props: IStateProps = {
        student,
        deleting,
        onEdit: async (data) => {
            await dispatch(updateStudent(data));
            dispatch(push(`/students`));
        },
        onDelete: async () => {
            if (student) {
                setDeleting(true);
                await dispatch(removeStudent(student));
                dispatch(push(`/students`));
            }
        }
    };

    return (<View {...props}/>);
};
