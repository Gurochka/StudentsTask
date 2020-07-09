import { ActionType, BaseAction, Notify } from '../actions/root.actions';

export const notifyReducer = (state: Notify | null = null, action: BaseAction<Notify>) => {
    switch (action.type) {
        case ActionType.NOTIFY:
            return action.payload;
        default:
            return state;
    }
};
