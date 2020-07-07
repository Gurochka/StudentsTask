import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { studentsReducer } from './students.reducers';

export const rootReducer = combineReducers({
    form: formReducer,
    students: studentsReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
