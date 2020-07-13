import { StudentCreator } from '../../../../common/model/student/studentCreator';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { DictionaryItem } from '../../../../common/model/resources/dictionaries/dictionaryItem';

export interface IStateProps {
    assessment: DictionaryItem[];
    initialValues?: StudentViewModel | null | undefined;
    onSubmit: (student: any) => void;
    onGoBack: () => void;
}

export interface IFormProps{
    student?: StudentViewModel | null;
    onSave: (student: StudentViewModel | StudentCreator) => void;
}
