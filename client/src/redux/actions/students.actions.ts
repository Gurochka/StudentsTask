import axios from 'axios';

import { ActionType, BaseAction, BaseThunkAction } from './root.actions';
import { StudentViewModel } from '../../common/model/student/studentViewModel';
import { ActiveStudentState, ListStudentsState } from '../reducers/students.reducers';

export const setActiveStudent = (student: ActiveStudentState): BaseAction => ({
    type: ActionType.SET_STUDENT,
    payload: student
});

export const getActiveStudent = (studentId: number | string): BaseThunkAction => {
    return async (dispatch) => {
        const studentsReq = await axios.get<StudentViewModel>(`/students/${studentId}`);
        dispatch(setActiveStudent(studentsReq.data));
    };
};

export const setStudents = (students: ListStudentsState): BaseAction => ({
    type: ActionType.SET_STUDENTS,
    payload: students
});

export const getStudents = (): BaseThunkAction => {
    return async (dispatch, getState) => {
        const { students: { list } } = getState();
        if (!list || list.length > 10) {
            const studentsReq = await axios.get<StudentViewModel[]>('/students');
            dispatch(setStudents(studentsReq.data));
        }
    };
};

export const addStudent = (studentData: StudentViewModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        const studentReq = await axios.post<StudentViewModel>(`/students`, studentData);
        const { students: { list } } = getState();
        if (list) {
            dispatch(setStudents([...list, studentReq.data]));
        }
    };
};

export const updateStudent = (student: StudentViewModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        const updatedStudentReq = await axios.put<StudentViewModel>(`/students/${student.id}`, student);
        const { students: { active, list } } = getState();

        if (active && active.id === student.id) {
            dispatch(setActiveStudent(updatedStudentReq.data));
        }
        if (list) {
            dispatch(setStudents(list.map((s: StudentViewModel) => s.id === student.id ? updatedStudentReq.data : s)));
        }
    };
};

export const removeStudent = (student: StudentViewModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        await axios.delete<string>(`/students/${student.id}`);
        const { students: { list } } = getState();

        if (list) {
            dispatch(setStudents(list.filter((s: StudentViewModel) => s.id !== student.id)));
        }
    };
};
