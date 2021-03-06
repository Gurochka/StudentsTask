import { ThunkAction } from 'redux-thunk';
import { AppState } from '../reducers';

export type AppDispatch = (...args: any[]) => Promise<void> | void;

export enum ActionType {
    SET_STUDENTS = `[Student] Set list`,
    SET_STUDENT = '[Student] Set active',
    ADD_STUDENT = '[Student] Add',
    REMOVE_STUDENT = '[Student] Delete',
    UPDATE_STUDENT = '[Student] Update',

    SHOW_MESSAGE = '[Http wrapper] Show message',
    RESET = '[Http wrapper] Reset',
    CALLWRAPPER_BLOCKING_CALL_INCREMENT = '[Http wrapper] BlockingCallCount increment',
    CALLWRAPPER_BLOCKING_CALL_DECREMENT = '[Http wrapper] BlockingCallCount decrement',

    SET_DICTIONARIES = '[Resources] Set dictionaries',
}

export class BaseAction<T = any> {
    type: ActionType;
    payload?: T;
}

export type BaseThunkAction = ThunkAction<void, AppState, {}, BaseAction>

export interface Message {
    type: "error" | "warning" | "info" | "success" | "primary" | "secondary";
    message: string;
}
