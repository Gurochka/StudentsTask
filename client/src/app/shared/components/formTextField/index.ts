import { ChangeEvent } from 'react';
import { View } from './view';
import { IFieldProps, IStateProps } from './model';

export const FormTextField = (fieldProps: IFieldProps) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!fieldProps.pattern) {
            fieldProps.input.onChange(e);
            return;
        }
        const value = e.target.value;
        const patternRegexp = new RegExp(fieldProps.pattern);

        if (patternRegexp.test(value)) {
            fieldProps.input.onChange(e);
        }
    };


    const props: IStateProps = {
        ...fieldProps,
        onChange
    };

    return View(props);
};
