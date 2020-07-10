/*Codegen*/
// tslint:disable
/* eslint-disable */

import { StudentViewModel } from '../../../../../common/model/student/studentViewModel';
import { Student } from '../models/student';

export class StudentViewModelMapper {
      public static toStudentViewModel(model: Student): StudentViewModel {
            let result : StudentViewModel = {};
            result.id = model.id ? +model.id : model.id;
            result.firstname = model.firstname;
            result.lastname = model.lastname;
            result.middlename = model.middlename;
            result.birthdate = model.birthdate;
            result.assessment = model.assessment;
            return result;
      }
      public static fromStudentViewModel(viewModel: StudentViewModel): Student {
            let result = new Student();
            result.id = viewModel.id;
            result.firstname = viewModel.firstname;
            result.lastname = viewModel.lastname;
            result.middlename = viewModel.middlename;
            result.birthdate = viewModel.birthdate;
            result.assessment = viewModel.assessment;
            return result;
      }
}
