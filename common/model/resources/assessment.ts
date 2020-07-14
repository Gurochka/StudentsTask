import { enumsDefinition } from '../enums';

export enum Assessment {
    bad = 2,
    satisfactory = 3,
    good = 4,
    excellent = 5
}

enumsDefinition.Assessment = {
    bad: {
        translation: 'неуд',
        order: 3
    },
    satisfactory: {
        translation: 'уд',
        order: 2
    },
    good: {
        translation: 'хор',
        order: 1
    },
    excellent: {
        translation: 'отл',
        order: 0
    }
}
