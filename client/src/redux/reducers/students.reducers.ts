import { ActionType, BaseAction } from '../actions/root.actions';
import { combineReducers } from 'redux';
import { StudentViewModel } from '../../common/model/student/studentViewModel';

const activeStudent = (state: StudentViewModel = {}, action: BaseAction<StudentViewModel>) => {
    switch (action.type) {
        case ActionType.SET_STUDENT:
            return action.payload;

        default:
            return state;
    }
};

const studentsList = (state: StudentViewModel[] = [], action: BaseAction<StudentViewModel[]>) => {
    switch (action.type) {
        case ActionType.SET_STUDENTS:
            return action.payload;
        default:
            return state;
    }
};

export const studentsReducer = combineReducers({
    active: activeStudent,
    list: studentsList
});
