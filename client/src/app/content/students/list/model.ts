import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export interface IModel {
    students?: StudentViewModel[];
}

export interface IActions {
    onClickDelete: (student_id: number | undefined) => void;
    onClickEdit: (student: number | undefined) => void;
}

export interface IStateProps extends IModel, IActions {
}
