import { useRef, useEffect, ReactNode } from 'react';
import { WrappedFieldProps } from 'redux-form';

import { FormTextField } from '../../../shared/components/formTextField';
import { FormSelectField } from '../../../shared/components/formSelectField';
import { FormDateTimeField } from '../../../shared/components/formDateTimeField';

interface IFieldProps extends WrappedFieldProps {
    field: 'text' | 'select' | 'date';
}

export interface IBaseProps extends IFieldProps {
    inputRef: any;
    children?: React.ReactNode;
}

export const BaseField = (fieldProps: IFieldProps) => {

    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (fieldProps.meta.error && fieldProps.meta.error.isFirstField) {
            inputRef.current.focus();
        }
    }, [fieldProps.meta.error]);

    const props: IBaseProps = {
        inputRef,
        ...fieldProps
    };

    if (fieldProps.field === 'text') {
        return FormTextField(props);
    }
    if (fieldProps.field === 'select') {
        return FormSelectField(props);
    }
    if (fieldProps.field === 'date') {
        return FormDateTimeField(props);
    }
};
