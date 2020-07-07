import { StudentService } from '../services';

const studentService = new StudentService();

export class StudentCtrl {
    async getStudents (req, res) {
        const students = await studentService.getStudents();
        res.send(students);
    }

    async create (req, res) {
        const created = await studentService.create(req.body);
        res.send(created);
    }

}
