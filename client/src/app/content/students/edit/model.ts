import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { ActiveStudentState } from '../../../../redux/reducers/students.reducers';

export interface IModel {
   student: ActiveStudentState;
   deleting: boolean;
}

export interface IStateProps extends IModel {
   onEdit: (student: StudentViewModel) => void;
   onDelete: () => void;
}
