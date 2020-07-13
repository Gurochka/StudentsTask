import axios from 'axios';
import { ActionType, BaseAction } from './root.actions';
import { AppState } from '../reducers/root.reducers';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Dictionaries } from '../../../../common/model/resources/dictionaries';
import { ResourcesViewModel } from '../../../../common/model/resources';

const setDictionaries = (dictionaries: Dictionaries): BaseAction => ({
    type: ActionType.SET_DICTIONARIES,
    payload: dictionaries
});

export const getResources = (): ThunkAction<void, AppState, {}, AnyAction> => {
    return async (dispatch, getState) => {
        const { resources } = getState();

        if (!resources.dictionaries.assessment) {
            const resourcesReq = await axios.get<ResourcesViewModel>(`/resources`);
            dispatch(setDictionaries(resourcesReq.data.dictionaries));
        }
    };
};
