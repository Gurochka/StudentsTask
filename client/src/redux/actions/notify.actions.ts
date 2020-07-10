import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';

import { ActionType, Notify } from './root.actions';
import { NotifyState } from '../reducers/notify.reducers';
import { store } from '../store';

export const notify = (message: NotifyState): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch) => {
        dispatch({ type: ActionType.NOTIFY, payload: message });
    };
};

// set up axios interceptors to notify about errors
axios.interceptors.response.use((response) => response,
    (error) => {
        const errorMessage: Notify = { type: 'error', message: 'Something bad happened with that request!' };
        store.dispatch({ type: ActionType.NOTIFY, payload: errorMessage });
        return Promise.reject(error);
    }
);
