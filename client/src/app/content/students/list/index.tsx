import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { AppDispatch, AppState } from '../../../../redux/actions/root.actions';
import { getStudents } from '../../../../redux/actions/students.actions';
import { View } from './view';
import { IModel } from './model';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export const Students: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector<AppState>(state => state.students.list);

    React.useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

    const props: IModel = {
        students: students as StudentViewModel[],
        onClickDelete: (student_id) => { console.log(`delete student with id ${student_id}`); },
        onClickEdit: (student) => dispatch(push(`/students/${student.id}`))
    };
    return React.useMemo(() => View(props), [props]);
};
