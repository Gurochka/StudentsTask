import axios from 'axios';

import { ActionType, BaseAction, BaseThunkAction } from './root.actions';
import { Dictionaries } from '../../../../common/model/resources/dictionaries';
import { ResourcesViewModel } from '../../../../common/model/resources';

const setDictionaries = (dictionaries: Dictionaries): BaseAction => ({
    type: ActionType.SET_DICTIONARIES,
    payload: dictionaries
});

export const getResources = (): BaseThunkAction => {
    return async (dispatch, getState) => {
        const { resources } = getState();

        if (!resources.dictionaries.assessment) {
            const resourcesReq = await axios.get<ResourcesViewModel>(`/resources`);
            dispatch(setDictionaries(resourcesReq.data.dictionaries));
        }
    };
};
