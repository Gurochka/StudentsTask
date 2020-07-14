import { createElement, useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { AppDispatch } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { IStateProps, IFormProps } from './model';
import { View } from './view';
import { getResources } from '../../../../redux/actions/resources';
import { DictionaryItem } from '../../../../common/model/resources/dictionaries/dictionaryItem';

const Form = reduxForm<any, any>({
    form: 'studentForm',
    enableReinitialize: true
})(View);

export const StudentForm = (props: IFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const assessment = useSelector<AppState, DictionaryItem[]>(state => state.resources.dictionaries.assessment);

    useEffect(() => {
        dispatch(getResources());
    }, [dispatch]);

    const formProps: IStateProps = {
        assessment,
        initialValues: props.student,
        onSubmit: props.onSave,
        onGoBack: () => dispatch(push('/students'))
    };

    return createElement(Form, formProps);
};
