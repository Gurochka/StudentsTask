import { Path, POST, GET, PUT, DELETE, PathParam } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';

import { StudentCreator } from '../../../../../common/model/student/studentCreator';
import { StudentViewModel } from '../../../../../common/model/student/studentViewModel';
import { StudentCreatorMapper } from '../mappers/studentCreatorMapper';
import { studentDBWrapper } from '../../../shared/dbWrappers/students_task/student/studentDBWrapper';
import { Student } from '../models/student';
import { StudentViewModelMapper } from '../mappers/studentViewModelMapper';


@Path('')
export class StudentService {

    @GET
    @Tags('students')
    @Path('/students')
    public async getStudents(): Promise<StudentViewModel[]> {
        const entityManager = studentDBWrapper.getEntityManager();
        const students = await entityManager.find<Student>(Student);
        const result = students.map(item => StudentViewModelMapper.toStudentViewModel(item));
        return result;
    }

    @GET
    @Tags('students')
    @Path('/students/:studentId')
    public async getStudent(@PathParam('studentId') studentId: number): Promise<StudentViewModel> {
        const entityManager = studentDBWrapper.getEntityManager();

        const student = await entityManager.findOne<Student>(Student, studentId);
        const studentViewModel = StudentViewModelMapper.toStudentViewModel(student);
        return studentViewModel;
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

    @PUT
    @Tags('students')
    @Path('/students/:studentId')
    public async update(editor: StudentViewModel): Promise<StudentViewModel> {
        const student = StudentViewModelMapper.fromStudentViewModel(editor);

        const entityManager = studentDBWrapper.getEntityManager();
        const studentToEdit = await entityManager.save<Student>(student);
        const studentViewModel = StudentViewModelMapper.toStudentViewModel(studentToEdit);
        return studentViewModel;
    }

    @DELETE
    @Tags('students')
    @Path('/students/:studentId')
    public async remove(
            @PathParam('studentId') studentId: number): Promise<any> {
        const entityManager = studentDBWrapper.getEntityManager();

        const student = await entityManager.findOne<Student>(Student, studentId);
        const result = await entityManager.remove(student);
        return result;
    }
}
