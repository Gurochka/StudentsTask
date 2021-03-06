import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { AppDispatch } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { getStudents, removeStudent } from '../../../../redux/actions/students';
import { View } from './view';
import { IStateProps, IModel } from './model';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { dictionaryToObject } from '../../../shared/pipes/dictionary';

export const Students = () => {
    const dispatch = useDispatch<AppDispatch>();
    const stateModel = useSelector<AppState, IModel>(state => ({
        students: state.students.list,
        assessment: state.resources.dictionaries.assessment
    }));

    const assessment = dictionaryToObject(stateModel.assessment);

    const [studentToRemove, setStudentToRemove] = useState<StudentViewModel | undefined>();

    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch]);

    const props: IStateProps = {
        ...stateModel,
        assessment,
        studentToRemove,
        onClickDelete: (student) => {
            setStudentToRemove(student);
        },
        deleteStudent: async () => {
            if (!studentToRemove) {
                return Promise.resolve();
            }
            await dispatch(removeStudent(studentToRemove));
            setStudentToRemove(undefined);
        },
        closePrompt: () => {
            setStudentToRemove(undefined);
        },
        onClickEdit: (student_id) => {
            dispatch(push(`/students/${student_id}`));
        }
    };
    return View(props);
};
