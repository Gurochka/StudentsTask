import { Path, POST, GET } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';

import { StudentCreator } from '../../../../../common/model/student/studentCreator';
import { StudentViewModel } from '../../../../../common/model/student/studentViewModel';
import { StudentCreatorMapper } from '../mappers/studentCreatorMapper';
import { studentDBWrapper } from '../../../shared/dbWrappers/students_task/student/studentDBWrapper';
import { Student } from '../models/student';
import { StudentViewModelMapper } from '../mappers/studentViewModelMapper';


@Path('')
export class StudentService {

    // eslint-disable-next-line require-await
    @GET
    @Tags('students')
    @Path('/students')
    public async getStudents(): Promise<StudentViewModel[]> {
        const entityManager = studentDBWrapper.getEntityManager();
        const students = await entityManager.find<Student>(Student);
        const result = students.map(item => StudentViewModelMapper.toStudentViewModel(item));
        return result;
    }

    @POST
    @Tags('students')
    @Path('/students')
    public async create(creator: StudentCreator): Promise<StudentViewModel> {
        const student = StudentCreatorMapper.fromStudentCreator(creator);

        const entityManager = studentDBWrapper.getEntityManager();
        const created = await entityManager.save<Student>(student);
        const studentViewModel = StudentViewModelMapper.toStudentViewModel(created);
        return studentViewModel;
    }

}
