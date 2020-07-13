import { DictionaryItem } from '../../common/model/resources/dictionaries/dictionaryItem';

export const enumToDictionaryItem = (values: any): DictionaryItem[] => {
    const res: DictionaryItem[] = [];
    if (values) {
        for (const value in values) {
            if (isNaN(Number(value))) {
                res.push({
                    id: +values[value],
                    name: value,
                });
            }
        }
    }

    return res;
};
