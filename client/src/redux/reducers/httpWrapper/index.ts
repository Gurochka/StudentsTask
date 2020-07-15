import { combineReducers } from 'redux';
import { MessageState, messageReducer } from './message';

export class HttpWrapperState {
    public message: MessageState
}

const httpWrapper = combineReducers<HttpWrapperState>({
    message: messageReducer
});

export { httpWrapper };
