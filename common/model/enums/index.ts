import { DictionaryItem } from '../resources/dictionaries/dictionaryItem';

interface EnumItemDefinition {
    order?: number;
    parentId?: number;
    disabled?: boolean;
    optional?: boolean;
    translation?: string;
}

interface EnumItemsDefinition {
    [key: string]: EnumItemDefinition;
}

interface EnumsDefinition {
    [key: string]: EnumItemsDefinition;
}

export const enumsDefinition: EnumsDefinition = {};

const compareTwoParams = (a: any, b: any) => {
    let aCondition = a;
    let bCondition = b;
    if (aCondition === 0) {
        aCondition = '0';
    }
    if (bCondition === 0) {
        bCondition = '0';
    }
    if (aCondition && bCondition) {
        return a > b ? 1 : a < b ? -1 : 0;
    }
    if (aCondition && !bCondition) {
        return -1;
    }
    if (!aCondition && bCondition) {
        return 1;
    }
    return 0;
};

export const processDictionaryItems = (name: string, dictionary: DictionaryItem[]): DictionaryItem[] => {
    const enumDefinition = enumsDefinition[name];
    if (!enumDefinition) {
        return dictionary;
    }

    return dictionary
        .filter(item => !enumDefinition[item.name] || !enumDefinition[item.name].disabled)
        .map((item: DictionaryItem) => {
            if (enumDefinition[item.name]
                && enumDefinition[item.name].parentId !== null
                && enumDefinition[item.name].parentId !== undefined) {
                item.parentId = enumDefinition[item.name].parentId;
            }

            if (enumDefinition[item.name]
                && enumDefinition[item.name].translation !== null
                && enumDefinition[item.name].translation !== undefined) {
                item.translation = enumDefinition[item.name].translation;
            }

            return item;
        })
        .sort((a: DictionaryItem, b: DictionaryItem) => {
            let res = 0;
            const aDefinition = enumDefinition[a.name];
            const bDefinition = enumDefinition[b.name];

            res = compareTwoParams(
                aDefinition && aDefinition.order,
                bDefinition && bDefinition.order);
            if (res !== 0) {
                return res;
            }

            return compareTwoParams(a.name, b.name);
        });
};
