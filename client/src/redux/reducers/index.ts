import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { studentsReducer, StudentsState } from './students';
import { resources, ResourcesState } from './resources';
import { httpWrapper, HttpWrapperState } from './httpWrapper';

export interface AppState {
    students: StudentsState;
    form: FormStateMap;
    router: RouterState;
    resources: ResourcesState;
    httpWrapper: HttpWrapperState;
}

export const rootReducer = (history: History) => combineReducers<AppState>({
    router: connectRouter(history),
    form: formReducer,
    students: studentsReducer,
    resources,
    httpWrapper
});
