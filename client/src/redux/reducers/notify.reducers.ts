import { ActionType, BaseAction, Notify } from '../actions/root.actions';

export type NotifyState = Notify | null;

export const notifyReducer = (state: NotifyState = null, action: BaseAction): NotifyState => {
    switch (action.type) {
        case ActionType.NOTIFY:
            return action.payload;
        default:
            return state;
    }
};
