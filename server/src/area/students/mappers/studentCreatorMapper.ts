/*Codegen*/
// tslint:disable
/* eslint-disable */

import { StudentCreator } from '../../../../../common/model/student/studentCreator';
import { Student } from '../models/student';

export class StudentCreatorMapper {
      public static toStudentCreator(model: Student): StudentCreator {
            let result : StudentCreator = {};
            result.firstname = model.firstname;
            result.lastname = model.lastname;
            result.middlename = model.middlename;
            result.birthdate = model.birthdate;
            result.assessment = model.assessment;
            return result;
      }
      public static fromStudentCreator(viewModel: StudentCreator): Student {
            let result = new Student();
            result.firstname = viewModel.firstname;
            result.lastname = viewModel.lastname;
            result.middlename = viewModel.middlename;
            result.birthdate = viewModel.birthdate;
            result.assessment = viewModel.assessment;
            return result;
      }
}
