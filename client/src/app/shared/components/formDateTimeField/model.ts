import { WrappedFieldProps } from 'redux-form';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export type IFieldProps = WrappedFieldProps

export interface IStateProps extends IFieldProps{
    onChange: (date: MaterialUiPickersDate, value?: string | null) => void;
    value?: string | null;
}
