import axios from 'axios';
import { ActionType, AppDispatch } from './root.actions';

export const getStudents = () => {
    return (dispatch:AppDispatch) => {
        return axios.get('/students')
            .then(res => dispatch({ type: ActionType.SET_STUDENT, payload: res }))
    }
}