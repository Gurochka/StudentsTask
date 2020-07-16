import { StudentViewModel } from '../../../../common/model/student/studentViewModel';
import { ActiveStudentState } from '../../../../redux/reducers/students';

export interface IModel {
   student: ActiveStudentState;
   deleting: boolean;
}

export interface IStateProps extends IModel {
   onEdit: (student: StudentViewModel) => Promise<void>;
   onDelete: () => void;
}
