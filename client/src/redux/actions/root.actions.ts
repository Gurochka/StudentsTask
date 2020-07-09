import { store } from '../store';

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = (...args: any[]) => Promise<void> | void;

export enum ActionType {
    SET_STUDENTS = `[Student] Set list`,
    SET_STUDENT = '[Student] Set active',
    ADD_STUDENT = '[Student] Add',
    REMOVE_STUDENT = '[Student] Delete',
    UPDATE_STUDENT = '[Student] Update',

    NOTIFY = '[Notify] Show'
}

export class BaseAction<T = any> {
    type: ActionType;
    payload?: T;
}

export type Notify = {
    type: "error" | "warning" | "info" | "success" | "primary" | "secondary";
    message: string;
}
