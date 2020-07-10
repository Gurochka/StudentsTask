/*Codegen*/
// tslint:disable
/* eslint-disable */

import { StudentViewModel } from '../../../../../common/model/student/studentViewModel';
import { Student } from '../models/student';

export class StudentViewModelMapper {
      public static toStudentViewModel(model: Student): StudentViewModel {
            let result : StudentViewModel = {};
            result.id = model.id ? +model.id : model.id;
            result.firstName = model.firstName;
            result.lastName = model.lastName;
            result.middleName = model.middleName;
            result.birthDate = model.birthDate;
            result.assessment = model.assessment;
            return result;
      }
      public static fromStudentViewModel(viewModel: StudentViewModel): Student {
            let result = new Student();
            result.id = viewModel.id;
            result.firstName = viewModel.firstName;
            result.lastName = viewModel.lastName;
            result.middleName = viewModel.middleName;
            result.birthDate = viewModel.birthDate;
            result.assessment = viewModel.assessment;
            return result;
      }
}
