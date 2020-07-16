import { ActionType, BaseAction, BaseThunkAction } from '..';
import { StudentViewModel } from '../../../common/model/student/studentViewModel';
import { ActiveStudentState, ListStudentsState } from '../../reducers/students';
import { httpService, HttpWrapperOptions } from '../../../app/shared/httpWrapper';

export const setActiveStudent = (student: ActiveStudentState): BaseAction => ({
    type: ActionType.SET_STUDENT,
    payload: student
});

export const getActiveStudent = (studentId: number | string): BaseThunkAction => {
    return async (dispatch) => {
        const studentsReq = await httpService.get<StudentViewModel>(`/students/${studentId}`);
        dispatch(setActiveStudent(studentsReq));
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
            const studentsReq = await httpService.get<StudentViewModel[]>('/students', new HttpWrapperOptions().Wait(true));
            dispatch(setStudents(studentsReq));
        }
    };
};

export const addStudent = (studentData: StudentViewModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        const studentReq = await httpService.post<StudentViewModel>(`/students`, studentData);
        const { students: { list } } = getState();
        if (list) {
            dispatch(setStudents([...list, studentReq]));
        }
    };
};

export const updateStudent = (student: StudentViewModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        const updatedStudentReq = await httpService.put<StudentViewModel>(`/students/${student.id}`, student);
        const { students: { active, list } } = getState();

        if (active && active.id === student.id) {
            dispatch(setActiveStudent(updatedStudentReq));
        }
        if (list) {
            dispatch(setStudents(list.map((s: StudentViewModel) => s.id === student.id ? updatedStudentReq : s)));
        }
    };
};

export const removeStudent = (student: StudentViewModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        await httpService.delete<string>(`/students/${student.id}`);
        const { students: { list } } = getState();

        if (list) {
            dispatch(setStudents(list.filter((s: StudentViewModel) => s.id !== student.id)));
        }
    };
};
