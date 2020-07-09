import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { studentsReducer } from './students.reducers';
import { notifyReducer } from './notify.reducers';

export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    students: studentsReducer,
    notify: notifyReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
