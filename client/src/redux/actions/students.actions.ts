import axios from 'axios';
import { ActionType, AppDispatch } from './root.actions';

export const getStudents = () => {
    return async (dispatch: AppDispatch) => {
        const students = await axios.get('/students');
        dispatch({ type: ActionType.SET_STUDENTS, payload: students.data });
    };
};
