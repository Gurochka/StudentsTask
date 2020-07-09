import { StudentCreator } from '../../../../common/model/student/studentCreator';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export interface IStateProps {
    initialValues?: StudentViewModel | null | undefined;
    onSubmit: (student: any) => void;
    onGoBack: () => void;
}

export interface IFormProps{
    student?: StudentViewModel | null;
    onSave: (student: StudentViewModel | StudentCreator) => void;
}
