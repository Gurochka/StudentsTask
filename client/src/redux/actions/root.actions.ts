import { store } from '../store';

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export enum ActionType {
    SET_STUDENTS = `[Student] Set list`,
    SET_STUDENT = '[Student] Set active'
}

export class BaseAction<T = any> {
    type: ActionType;
    payload?: T;
}
