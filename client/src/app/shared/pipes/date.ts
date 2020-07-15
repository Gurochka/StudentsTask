import { DateTime } from 'luxon';

export const dateLessThan = (maxDate: string) => (value?: string) => {
    if (value === undefined || value === null) {
        return true;
    }
    return (DateTime.fromFormat(value, 'yyyy-MM-dd') < DateTime.fromFormat(maxDate, 'yyyy-MM-dd'));
};

export const isDateFormatWrong = (value?: string): boolean => {
    if (value === undefined || value === null) {
        return true;
    }
    const date = DateTime.fromFormat(value, 'yyyy-MM-dd');
    return date.isValid;
};
