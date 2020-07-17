import { StudentService } from '../services';

const studentService = new StudentService();

export class StudentCtrl {
    async getStudents (req, res) {
        const students = await studentService.getStudents();
        res.send(students);
    }

    async getStudent (req, res) {
        const studentId = +req.params['studentId'];
        const student = await studentService.getStudent(studentId);
        res.send(student);
    }

    async create (req, res) {
        const created = await studentService.create(req.body);
        res.send(created);
    }

    async update (req, res) {
        const edited = await studentService.update(req.body);
        res.send(edited);
    }

    async remove (req, res) {
        const studentId = +req.params['studentId'];
        const answer = await studentService.remove(studentId);
        res.send(answer);
    }

}
