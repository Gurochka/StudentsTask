import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export interface IModel {
    students?: StudentViewModel[];
    studentToRemove?: StudentViewModel;
}

export interface IActions {
    deleteStudent: () => Promise<void>;
    onClickDelete: (student: StudentViewModel) => void;
    onClickEdit: (student: number | undefined) => void;
    closePrompt: () => void;
}

export interface IStateProps extends IModel, IActions {
}
