import { GenerateView, IgnoreViewModel, ViewModelType } from 'grunt-generate-view-model';
import { GenerateHistory } from 'grunt-generate-history-model';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Assessment } from '../../../../../common/model/resources/assessment';

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

    @ViewModelType({ 'type': 'Assessment' })
    @Column({ type: 'integer', 'nullable': true })
    public assessment?: number;

}
