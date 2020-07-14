import { DateTime } from 'luxon';

export const required = (value: any) => value ? undefined : 'Field is required';

export const dateLessThan = (maxDate: string) => (value?: string) => {
    if (value && DateTime.fromFormat(value, 'yyyy-MM-dd') > DateTime.fromFormat(maxDate, 'yyyy-MM-dd')) {
        return 'Date should not be after maximal date';
    }
};

const maxDate = DateTime.local().minus({ years: 14 }).toFormat('yyyy-MM-dd');
export const dateLessThan14YearsAgo = dateLessThan(maxDate);

export const wrongDateFormat = (value?: string) => {
    if (value) {
        const date = DateTime.fromFormat(value, 'yyyy-MM-dd');
        if (!date.isValid) {
            return 'Invalid date format';
        }
    }
};
