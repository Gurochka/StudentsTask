import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { AppDispatch, AppState } from '../../../../redux/actions/root.actions';
import { getStudents, removeStudent, setStudents } from '../../../../redux/actions/students.actions';
import { View } from './view';
import { IStateProps } from './model';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export const Students: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector<AppState>(state => state.students.list);
    const [studentToRemove, setStudentToRemove] = React.useState<StudentViewModel | undefined>();

    React.useEffect(() => {
        dispatch(getStudents());
        return () => { dispatch(setStudents(null)) }
    }, []);

    const props: IStateProps = {
        students: students as StudentViewModel[],
        studentToRemove,
        onClickDelete: (student) => {
            setStudentToRemove(student);
        },
        deleteStudent: async () => {
            if (studentToRemove) {
                await dispatch(removeStudent(studentToRemove));
                setStudentToRemove(undefined);
                dispatch(getStudents());
            }
        },
        closePrompt: () => {
            setStudentToRemove(undefined);
        },
        onClickEdit: (student_id) => {
            dispatch(push(`/students/${student_id}`));
        }
    };
    return React.useMemo(() => View(props), [props]);
};
