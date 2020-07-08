import { StudentCreator } from '../../../../common/model/student/studentCreator';

export interface IStateProps {
   onAdd: (student: StudentCreator) => void;
}
