import { DictionaryItem } from '../../../common/model/resources/dictionaries/dictionaryItem';

export const dictionaryToObject = (dictionary: DictionaryItem[]): any => {
    const res: any = {};
    if (dictionary && dictionary.length > 0) {
        dictionary.forEach(di => {
            res[di.id] = di.translation || di.name;
        });
    }

    return res;
};
