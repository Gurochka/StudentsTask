import axios from 'axios';
import { ActionType } from './root.actions';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { StudentViewModel } from '../../common/model/student/studentViewModel';

export const getStudents = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        const students = await axios.get<StudentViewModel[]>('/students');
        dispatch({ type: ActionType.SET_STUDENTS, payload: students.data });
    };
};
