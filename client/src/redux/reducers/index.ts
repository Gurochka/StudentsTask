import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { studentsReducer, StudentsState } from './students';
import { notifyReducer, NotifyState } from './notify';
import { resources, ResourcesState } from './resources';

export interface AppState {
    students: StudentsState;
    form: FormStateMap;
    router: RouterState;
    notify: NotifyState;
    resources: ResourcesState;
}

export const rootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    form: formReducer,
    students: studentsReducer,
    notify: notifyReducer,
    resources
});
