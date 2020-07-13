import { Path, GET } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { Dictionaries } from '../../../../../common/model/resources/dictionaries';
import { processDictionaryItems } from '../../../../../common/model/enums';
import { enumToDictionaryItem } from '../../../../common';
import { Assessment } from '../../../../../common/model/resources/assessment';
import { ResourcesViewModel } from '../../../../../common/model/resources';

const getDictionary = (): Promise<Dictionaries> => {
    const dictionary = new Dictionaries();
    dictionary.assessment = processDictionaryItems('Assessment', enumToDictionaryItem(Assessment));

    return Promise.resolve(dictionary);
};


@Path('')
export class ResourcesService {

    @GET
    @Tags('resources')
    @Path('/resources')
    public async getResources(): Promise<ResourcesViewModel> {
        const resource = new ResourcesViewModel();
        resource.dictionaries = await getDictionary();
        return resource;
    }

}
