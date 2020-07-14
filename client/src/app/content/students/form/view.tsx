import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, MenuItem } from '@material-ui/core';
import { DateTime } from 'luxon';

import { IStateProps } from './model';
import { FormTextField } from '../../../shared/components/formTextField';
import { FormSelectField } from '../../../shared/components/formSelectField';
import { required, dateLessThan14YearsAgo, wrongDateFormat } from '../../../shared/validation';
import { LoadingButton } from '../../../shared/components/loadingButton';
import { FormDateTimeField } from '../../../shared/components/formDateTimeField';

export const View = (props: IStateProps & InjectedFormProps) => {
    const field_classes = 'col-sm-6 pr-4 pb-4';
    const { handleSubmit, assessment, pristine, submitting, invalid } = props;

    const maxDate = DateTime.local().minus({ years: 14 }).toFormat('yyyy-MM-dd');

    return (
        <form className="p-4 row justify-content-between" onSubmit={handleSubmit(props.onSubmit)} >
            <Field name="firstName" label="First Name" className={ field_classes }
                component={FormTextField} validate={[required]} pattern="^[a-zA-ZА-Яа-я\s]*$" />

            <Field name="lastName" label="Last Name" className={ field_classes }
                component={FormTextField} validate={[required]} pattern="^[a-zA-Zа-яА-Я\s]*$" />

            <Field name="birthDate" label="Birthday" className={ field_classes }
                component={FormDateTimeField} validate={[wrongDateFormat, dateLessThan14YearsAgo]} maxDate={maxDate} />

            <Field name="assessment" label="Assessment" className={ field_classes } id="student-assessment" component={FormSelectField}>
                {
                    assessment?.map(item => (
                        <MenuItem value={item.id} key={item.id}>{item.translation}</MenuItem>
                    ))
                }
            </Field>

            <div className="d-flex justify-content-end w-100 pr-4">
                <LoadingButton variant="contained" color="secondary" className="mr-4" type="submit"
                    loading={submitting} disabled={invalid || pristine || submitting}>
                    Save
                </LoadingButton>
                <Button variant="contained" type="button" onClick={props.onGoBack}>Go back to list</Button>
            </div>
        </form>
    );
};
