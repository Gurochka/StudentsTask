import { ActionType, BaseAction } from '../actions/root.actions';
import { combineReducers } from 'redux';
import { StudentViewModel } from '../../common/model/student/studentViewModel';

export type ActiveStudentState = StudentViewModel | null;
export type ListStudentsState = StudentViewModel[] | null;

const activeStudent = (state: ActiveStudentState = null, action: BaseAction): ActiveStudentState => {
    switch (action.type) {
        case ActionType.SET_STUDENT:
            return action.payload;
        default:
            return state;
    }
};

const studentsList = (state: ListStudentsState = null, action: BaseAction): ListStudentsState => {
    switch (action.type) {
        case ActionType.SET_STUDENTS:
            return action.payload;
        default:
            return state;
    }
};

export interface StudentsState {
    active: ActiveStudentState;
    list: ListStudentsState;
}

export const studentsReducer = combineReducers<StudentsState>({
    active: activeStudent,
    list: studentsList
});
