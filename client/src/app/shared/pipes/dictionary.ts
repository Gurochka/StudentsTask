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

// export const dictionaryPipe = (dictionary: DictionaryItem[] | any, id: number, nameAlways?: boolean): string => {
//     if (!dictionary) {
//         return null;
//     }
//     const finded = dictionary.find((item: DictionaryItem) => item.id === id);
//     if (!finded) {
//         return null;
//     }
//     return (nameAlways) ? finded.name : (finded.translation || finded.name);
// };
