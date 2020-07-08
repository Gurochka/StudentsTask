import React from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, MenuItem } from '@material-ui/core';

import { IStateProps } from './model';
import { FormTextField } from '../../../shared/components/formTextField';
import { FormSelectField } from '../../../shared/components/formSelectField';
import { assessments } from '../../../../common/constants';

export const View = (props: IStateProps & InjectedFormProps) => {
    const field_classes = 'col-sm-6 pr-4 pb-4';
    const { handleSubmit, pristine, submitting } = props;

    return (
        <form className="p-4 row justify-content-between" onSubmit={handleSubmit(props.onSubmit)} >
            <Field name="firstname" label="First Name" className={ field_classes } component={FormTextField} />
            <Field name="lastname" label="Last Name" className={ field_classes } component={FormTextField} />
            <Field name="birthdate" label="Birthday" type="date" InputLabelProps={{ shrink: true }} className={ field_classes } component={FormTextField}/>

            <Field name="assessment" label="Assessment" className={ field_classes } id="student-assessment" component={FormSelectField}>
                {
                    assessments.map(assessment => (
                        <MenuItem value={assessment} key={assessment}>{assessment}</MenuItem>
                    ))
                }
            </Field>

            <div className="d-flex justify-content-end w-100 pr-4">
                <Button variant="contained" color="secondary" className="mr-4" type="submit" disabled={pristine || submitting}>Save</Button>
                <Button variant="contained" type="button" onClick={props.onGoBack}>Go back to list</Button>
            </div>
        </form>
    );
};
