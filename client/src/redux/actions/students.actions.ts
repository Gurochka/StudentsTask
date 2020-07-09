import axios from 'axios';
import { ActionType } from './root.actions';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { StudentViewModel } from '../../common/model/student/studentViewModel';

export const setActiveStudent = (student: StudentViewModel | null): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch) => {
        dispatch({ type: ActionType.SET_STUDENT, payload: student });
    };
};

export const getActiveStudent = (studentId: number | string): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        const studentsReq = await axios.get<StudentViewModel>(`/students/${studentId}`);
        dispatch(setActiveStudent(studentsReq.data));
    };
};

export const setStudents = (students: StudentViewModel[] | null): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch) => {
        dispatch({ type: ActionType.SET_STUDENTS, payload: students });
    };
};

export const getStudents = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        const studentsReq = await axios.get<StudentViewModel[]>('/students');
        dispatch(setStudents(studentsReq.data));
    };
};

export const addStudent = (studentData: StudentViewModel): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch, getState) => {
        const studentReq = await axios.post<StudentViewModel>(`/students`, studentData);
        let { students: { list } }: any = getState();
        list = list || [];
        dispatch(setStudents([...list, studentReq.data]));
    };
};

export const updateStudent = (student: StudentViewModel): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch, getState) => {
        const updatedStudentReq = await axios.put<StudentViewModel>(`/students/${student.id}`, student);
        const { students: { active, list } }: any = getState();

        if (active.id === student.id) {
            dispatch(setActiveStudent(updatedStudentReq.data));
        }
        dispatch(setStudents(list.map((s: StudentViewModel) => s.id === student.id ? updatedStudentReq.data : s)));
    };
};

export const removeStudent = (student: StudentViewModel): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch, getState) => {
        await axios.delete<string>(`/students/${student.id}`);
        const { students: { active, list } }: any = getState();

        if (active && active.id === student.id) {
            dispatch(setActiveStudent(null));
        }
        dispatch(setStudents(list.filter((s: StudentViewModel) => s.id !== student.id)));
    };
};
