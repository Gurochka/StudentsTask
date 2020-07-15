import { ActionType, BaseAction, BaseThunkAction } from '..';
import { Dictionaries } from '../../../../../common/model/resources/dictionaries';
import { ResourcesViewModel } from '../../../../../common/model/resources';
import { httpService } from '../../../app/shared/httpWrapper';

const setDictionaries = (dictionaries: Dictionaries): BaseAction => ({
    type: ActionType.SET_DICTIONARIES,
    payload: dictionaries
});

export const getResources = (): BaseThunkAction => {
    return async (dispatch, getState) => {
        const { resources } = getState();

        if (!resources.dictionaries.assessment) {
            const resourcesReq = await httpService.get<ResourcesViewModel>(`/resources`);
            dispatch(setDictionaries(resourcesReq.dictionaries));
        }
    };
};
