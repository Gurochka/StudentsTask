import { ReactNode } from 'react';
import { WrappedFieldProps } from 'redux-form';

export interface IModel extends WrappedFieldProps {
    label: string;
    className?: string;
    children?: ReactNode;
    id: string;
}
