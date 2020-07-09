import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { View } from './view';
import { IStateProps } from './model';
import { getActiveStudent, setActiveStudent, updateStudent } from '../../../../redux/actions/students.actions';
import { AppDispatch, AppState } from '../../../../redux/actions/root.actions';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export const EditStudent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const student = useSelector<AppState>(state => state.students.active);

    const { studentId } = useParams();

    useEffect(() => {
        dispatch(getActiveStudent(studentId));
        return () => {
            dispatch(setActiveStudent(null));
        };
    }, []);

    const props: IStateProps = {
        student: student as StudentViewModel | null,
        onEdit: async (data) => {
            await dispatch(updateStudent(data));
            dispatch(push(`/students`));
        }
    };

    return (<View {...props}/>);
};
