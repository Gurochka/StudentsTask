import { ActionType, BaseAction, Message } from '../../actions';

export type MessageState = Message | null;

export const message = (state: MessageState = null, action: BaseAction): MessageState => {
    switch (action.type) {
        case ActionType.SHOW_MESSAGE:
            return action.payload;
        default:
            return state;
    }
};
