/*Codegen*/
// tslint:disable
/* eslint-disable */

import { StudentCreator } from '../../../../../common/model/student/studentCreator';
import { Student } from '../models/student';

export class StudentCreatorMapper {
      public static toStudentCreator(model: Student): StudentCreator {
            let result : StudentCreator = {};
            result.firstName = model.firstName;
            result.lastName = model.lastName;
            result.middleName = model.middleName;
            result.birthDate = model.birthDate;
            result.assessment = model.assessment;
            return result;
      }
      public static fromStudentCreator(viewModel: StudentCreator): Student {
            let result = new Student();
            result.firstName = viewModel.firstName;
            result.lastName = viewModel.lastName;
            result.middleName = viewModel.middleName;
            result.birthDate = viewModel.birthDate;
            result.assessment = viewModel.assessment;
            return result;
      }
}
