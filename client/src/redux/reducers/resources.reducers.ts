import { combineReducers } from 'redux';

import { ActionType, BaseAction } from '../actions/root.actions';
import { Dictionaries } from '../../../../common/model/resources/dictionaries';

export type DictionaryState = Dictionaries;

export interface ResourcesState {
    dictionaries: DictionaryState;
}

const dictionaries = (state: DictionaryState = {} as any, action: BaseAction): DictionaryState => {
    switch (action.type) {
        case ActionType.SET_DICTIONARIES:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export const resources = combineReducers<ResourcesState>({
    dictionaries,
});
