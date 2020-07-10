import { GenerateView, IgnoreViewModel } from 'grunt-generate-view-model';
import { GenerateHistory } from 'grunt-generate-history-model';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Assessment } from '../../../../../common/model/enums/assessment';

@Entity(/*'student'*/)
@GenerateHistory({
    'historyPath': './src/area/students/models/.history'
})
@GenerateView({
    'model': 'StudentViewModel',
    'filePath': '../common/model/student',
    'mapperPath': './src/area/students/mappers'
})
@GenerateView({
    'model': 'StudentCreator',
    'filePath': '../common/model/student',
    'mapperPath': './src/area/students/mappers'
})
export class Student {
    @PrimaryGeneratedColumn()
    @IgnoreViewModel('StudentCreator')
    public id?: number;

    @Column({ type: 'text', name: 'first_name', 'nullable': false })
    public firstName: string;

    @Column({ type: 'text', name: 'last_name', 'nullable': false })
    public lastName: string;

    @Column({ type: 'text', name: 'middle_name', 'nullable': true })
    public middleName?: string;

    @Column({ type: 'text', name: 'birth_date', 'nullable': true })
    public birthDate?: string;

    @Column({ type: 'int', 'nullable': true })
    public assessment?: Assessment;

}
