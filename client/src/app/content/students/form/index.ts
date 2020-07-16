import { DateTime } from 'luxon';
import { createElement } from 'react';
import { reduxForm, SubmissionError } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { AppDispatch } from '../../../../redux/actions';
import { AppState } from '../../../../redux/reducers';
import { IStateProps, IFormProps } from './model';
import { View } from './view';
import { DictionaryItem } from '../../../../common/model/resources/dictionaries/dictionaryItem';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { validationPipe, isDateFormatWrong, dateLessThan } from '../../../shared/pipes';
import { RegExeps } from '../../../shared/constants';

const maxDate = DateTime.local().minus({ years: 14 }).toFormat('yyyy-MM-dd');

const getFormErrors = (formData: StudentViewModel) => validationPipe(formData, [
    {
        names: 'firstName,lastName',
        error: 'Field is required',
        type: 'required',
    }, {
        names: 'firstName,lastName',
        error: 'Name should contain only letters',
        type: 'pattern',
        pattern: RegExeps.letters
    }, {
        names: 'birthDate',
        error: 'Invalid date format',
        type: 'custom',
        validate: isDateFormatWrong
    }, {
        names: 'birthDate',
        error: `Date should be before ${maxDate}`,
        type: 'custom',
        validate: dateLessThan(maxDate)
    }
]);

const Form = reduxForm<any, any>({
    form: 'studentForm',
    enableReinitialize: true
})(View);

export const StudentForm = (props: IFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const assessment = useSelector<AppState, DictionaryItem[]>(state => state.resources.dictionaries.assessment);

    const onGoBack = () => dispatch(push('/students'));

    const formProps: IStateProps = {
        assessment,
        initialValues: props.student,
        onSubmit: async (student: StudentViewModel) => {
            const errors = getFormErrors(student);
            if (errors) {
                throw new SubmissionError(errors);
            } else {
                await props.onSave(student);
            }
        },
        onGoBack
    };

    return createElement(Form, formProps);
};
