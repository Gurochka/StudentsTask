import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { View } from './view';
import { IStateProps } from './model';
import { updateStudent, removeStudent } from '../../../../redux/actions/students';
import { AppDispatch } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { ActiveStudentState } from '../../../../redux/reducers/students';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export const EditStudent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const student = useSelector<AppState, ActiveStudentState>(state => state.students.active);
    const [deleting, setDeleting] = useState(false);

    const onEdit = async (data: StudentViewModel) => {
        await dispatch(updateStudent(data));
        dispatch(push(`/students`));
    };

    const onDelete = async () => {
        if (student) {
            setDeleting(true);
            await dispatch(removeStudent(student));
            dispatch(push(`/students`));
        }
    };

    const props: IStateProps = {
        student,
        deleting,
        onEdit,
        onDelete
    };
    return View(props);
};
