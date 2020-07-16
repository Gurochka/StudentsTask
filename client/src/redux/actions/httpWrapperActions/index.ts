import { ActionType, BaseAction } from '..';
import { MessageState } from '../../reducers/httpWrapper/message';

export const showMessage = (message: MessageState): BaseAction => ({
    type: ActionType.SHOW_MESSAGE,
    payload: message
});

export const increaseBlockingCallCounter = (): BaseAction => ({
    type: ActionType.CALLWRAPPER_BLOCKING_CALL_INCREMENT
});

export const decreaseBlockingCallCounter = (): BaseAction => ({
    type: ActionType.CALLWRAPPER_BLOCKING_CALL_DECREMENT
});