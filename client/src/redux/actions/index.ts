import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

export type AppDispatch = (...args: any[]) => Promise<void> | void;

export enum ActionType {
    SET_STUDENTS = `[Student] Set list`,
    SET_STUDENT = '[Student] Set active',
    ADD_STUDENT = '[Student] Add',
    REMOVE_STUDENT = '[Student] Delete',
    UPDATE_STUDENT = '[Student] Update',

    NOTIFY = '[Notify] Show',
    SET_DICTIONARIES = '[Resources] Set dictionaries'
}

export class BaseAction<T = any> {
    type: ActionType;
    payload?: T;
}

export type BaseThunkAction = ThunkAction<void, AppState, {}, BaseAction>

export interface Notify {
    type: "error" | "warning" | "info" | "success" | "primary" | "secondary";
    message: string;
}
