import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { View } from './view';
import { IStateProps } from './model';
import { setActiveStudent, updateStudent, removeStudent } from '../../../../redux/actions/students';
import { AppDispatch } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { ActiveStudentState } from '../../../../redux/reducers/students';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { showMessage } from '../../../../redux/actions/httpWrapperActions';
import { useCheckStudent } from '../../../shared/hooks/student';

export const EditStudent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const student = useSelector<AppState, ActiveStudentState>(state => state.students.active);
    const [deleting, setDeleting] = useState(false);
    const { studentId } = useParams();
    const error = useCheckStudent(studentId);

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

    useEffect(() => {
        if (error) {
            dispatch(push('/students'));
            dispatch(showMessage({
                type: 'error',
                message: 'Такого студента не найдено!'
            }));
        }
        return () => {
            dispatch(setActiveStudent(null));
        };
    }, [dispatch, error]);

    const props: IStateProps = {
        student,
        deleting,
        onEdit,
        onDelete
    };
    return View(props);
};
