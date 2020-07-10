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
    };
};

export const updateStudent = (student: StudentViewModel): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch, getState) => {
        const updatedStudentReq = await axios.put<StudentViewModel>(`/students/${student.id}`, student);
        const { students: { active } }: any = getState();

        if (active.id === student.id) {
            dispatch(setActiveStudent(updatedStudentReq.data));
        }
    };
};

export const removeStudent = (student: StudentViewModel): ThunkAction<void, {}, {}, AnyAction> => {
    return async () => {
        await axios.delete<string>(`/students/${student.id}`);
    };
};
