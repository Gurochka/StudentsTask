import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { DictionaryItem } from '../../../../common/model/resources/dictionaries/dictionaryItem';
import { ListStudentsState } from '../../../../redux/reducers/students';

export interface IModel {
    students: ListStudentsState;
    assessment: DictionaryItem[];
}

export interface IActions {
    studentToRemove?: StudentViewModel;
    deleteStudent: () => Promise<void>;
    onClickDelete: (student: StudentViewModel) => void;
    onClickEdit: (student?: number) => void;
    closePrompt: () => void;
}

export interface IStateProps extends IModel, IActions {
}
