import { ReactNode, ChangeEvent } from 'react';
import { WrappedFieldProps } from 'redux-form';

export interface IFieldProps extends WrappedFieldProps {
    pattern?: string;
    children?: ReactNode;
}

export interface IStateProps extends IFieldProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
