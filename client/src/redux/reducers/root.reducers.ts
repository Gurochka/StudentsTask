import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { studentsReducer, StudentsState } from './students.reducers';
import { notifyReducer, NotifyState } from './notify.reducers';

export interface AppState {
    students: StudentsState;
    form: FormStateMap;
    router: RouterState;
    notify: NotifyState;
}

export const rootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    form: formReducer,
    students: studentsReducer,
    notify: notifyReducer
});
