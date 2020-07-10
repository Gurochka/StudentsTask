import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export interface IModel {
   student: StudentViewModel | null
   deleting: boolean
}

export interface IStateProps extends IModel {
   onEdit: (student: StudentViewModel) => void
   onDelete: () => void
}
