import { ActionType, BaseAction } from '..';
import { MessageState } from '../../reducers/httpWrapper/message';

export const showMessage = (message: MessageState): BaseAction => ({
    type: ActionType.SHOW_MESSAGE,
    payload: message
});
