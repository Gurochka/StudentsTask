import { combineReducers } from 'redux';
import { MessageState, message } from './message';
import { blockingCallCount, BlockingCallCountState } from './blockingCallCount';

export class HttpWrapperState {
    message: MessageState;
    blockingCallCount: BlockingCallCountState;
}

const httpWrapper = combineReducers<HttpWrapperState>({
    message,
    blockingCallCount
});

export { httpWrapper };
