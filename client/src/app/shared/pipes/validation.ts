import { getDeepValue, setDeepValue } from './deepValue';

export interface ValidationItem {
    names: string;
    error: string;
    type: 'required' | 'pattern' | 'equals' | 'custom';
    pattern?: RegExp;
    validate?: (val: any) => boolean;
}

export class FormValidationError {
    constructor(error: string, isFirstField: boolean) {
        this.error = error;
        this.isFirstField = isFirstField;
    }

    public readonly error: string;
    public readonly isFirstField: boolean;
}

interface FieldWValue {
    field: string;
    value: any;
}

const arrayWildcard = '[]';
const getValuesToValidate = (fieldPrefix: string, field: string, data: any): FieldWValue[] => {
    const arrayWildcardIndex = field.indexOf(arrayWildcard);

    if (arrayWildcardIndex === -1) {
        return [{
            field: fieldPrefix + field,
            value: getDeepValue(data, field),
        }];
    }

    const leftSide = field.substring(0, arrayWildcardIndex);
    const unnormalizedRightSide = field.substring(arrayWildcardIndex + arrayWildcard.length);
    const rightSide = unnormalizedRightSide.startsWith('.')
        ? unnormalizedRightSide.substring(1)
        : unnormalizedRightSide;
    const array = getDeepValue(data, leftSide) as Array<any>;

    if (!array || !array.length) {
        return [];
    }

    if (rightSide) {
        return array
            .map((value: any, index: number) => getValuesToValidate(
                fieldPrefix + leftSide + `.${index}.`,
                rightSide,
                value))
            .reduce((result: any[], current: any) => {
                return current instanceof Array
                    ? result.concat(current)
                    : result.concat([current]);
            }, []);
    }

    return array.map((value: any, index: number) => ({
        field: fieldPrefix + leftSide + `.${index}`,
        value,
    }));
};
const validateFieldFor = (validation: ValidationItem) => (fieldWValue: FieldWValue): boolean => {
    switch (validation.type) {
        case 'required':
            return !!fieldWValue.value && fieldWValue.value.toString().replace(/(\r\n\t|\n|\r\t|\s)/gm, '').length > 0;
        case 'pattern':
            return fieldWValue.value === null || fieldWValue.value === undefined || fieldWValue.value === ''
                || !validation.pattern
                || validation.pattern.test(fieldWValue.value);
        case 'custom':
            if (validation.validate) {
                return validation.validate(fieldWValue.value);
            }
            return true;
        default:
            return true;
    }
};

export const validationPipe = (formData: any, fieldsWithValidation: ValidationItem[]) => {
    const clonedFormData = (formData) ? JSON.parse(JSON.stringify(formData)) : {};
    if (!fieldsWithValidation || !fieldsWithValidation.length) {
        return null;
    }

    const result: any = {};
    let firstErrorField: string | null = null;
    fieldsWithValidation.forEach((validationField) => {
        const fieldArray: string[] = validationField.names.split(',');
        const valuesArrays = fieldArray.map(field => getValuesToValidate('', field, clonedFormData));
        const validation = validateFieldFor(validationField);

        const validationResults: FieldWValue[][] = valuesArrays.map(valuesToValidate => {
            return valuesToValidate.filter(fieldWValue => !validation(fieldWValue));
        });

        const isErrorFound = validationResults.some(item => item.length !== 0);

        if (isErrorFound) {
            validationResults.forEach(validationResult => {
                validationResult.forEach((fieldWValue) => {
                    if (result[fieldWValue.field]) {
                        return;
                    }
                    const errorText = validationField.error;
                    setDeepValue(
                        result,
                        fieldWValue.field,
                        new FormValidationError(
                            errorText,
                            !firstErrorField)
                    );
                    if (!firstErrorField) {
                        firstErrorField = fieldWValue.field;
                    }
                });
            });
        }
    });

    const isFormInvalid = !!firstErrorField;

    return isFormInvalid ? result : null;
};
