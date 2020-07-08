import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export interface IModel {
    students: StudentViewModel[];
    onClickDelete: (student_id: number | undefined) => void;
    onClickEdit: (student: StudentViewModel) => void;
}
