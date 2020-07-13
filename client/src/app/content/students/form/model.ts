import { StudentCreator } from '../../../../common/model/student/studentCreator';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { DictionaryItem } from '../../../../common/model/resources/dictionaries/dictionaryItem';
import { ActiveStudentState } from '../../../../redux/reducers/students.reducers';

export interface IStateProps {
    assessment: DictionaryItem[];
    initialValues?: ActiveStudentState | undefined;
    onSubmit: (student: StudentViewModel) => void;
    onGoBack: () => void;
}

export interface IFormProps{
    student?: ActiveStudentState;
    onSave: (student: StudentViewModel | StudentCreator) => void;
}
