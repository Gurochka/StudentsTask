import { createElement } from 'react';
import { reduxForm } from 'redux-form';

import { IStateProps } from './model';
import { View } from './view';

const Form = reduxForm<any, any>({
    form: 'studentForm',
})(View);

export const StudentForm = () => {
    const props: IStateProps = {
        onSubmit: (some) => {
            console.log('on submit!', some);
        }
    };

    return createElement(Form, props);
};
