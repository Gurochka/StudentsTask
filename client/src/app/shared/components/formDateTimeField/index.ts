import { useState, useEffect } from 'react';
import { View } from './view';
import { IFieldProps, IStateProps } from './model';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';


export const FormDateTimeField = (fieldProps: IFieldProps) => {
    const [value, setValue] = useState<string | null | undefined>(null);

    useEffect(() => {
        setValue(fieldProps.input.value);
    }, [fieldProps.input.value]);

    const onChange = (date: MaterialUiPickersDate, pickerValue?: string | null) => {
        fieldProps.input.onChange(pickerValue);
        setValue(pickerValue);
    };

    const props: IStateProps = {
        ...fieldProps,
        value,
        onChange
    };

    return View(props);
};
