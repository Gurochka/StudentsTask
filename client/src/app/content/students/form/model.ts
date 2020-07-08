import { StudentCreator } from '../../../../common/model/student/studentCreator';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export interface IStateProps {
    onSubmit: (student: any) => void;
    onGoBack: () => void;
}

export interface IFormProps{
    onSave: (student: StudentViewModel | StudentCreator) => void;
}
