import { createElement } from 'react';
import { reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { AppDispatch } from '../../../../redux/actions/root.actions';
import { IStateProps, IFormProps } from './model';
import { View } from './view';

const Form = reduxForm<any, any>({
    form: 'studentForm',
})(View);

export const StudentForm = (props: IFormProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const formProps: IStateProps = {
        onSubmit: props.onSave,
        onGoBack: () => dispatch(push('/students'))
    };

    return createElement(Form, formProps);
};
