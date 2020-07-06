import { GenerateView, IgnoreViewModel } from 'grunt-generate-view-model';
import { GenerateHistory } from 'grunt-generate-history-model';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({ type: 'text', 'nullable': false })
    public firstname: string;

    @Column({ type: 'text', 'nullable': false })
    public lastname: string;

    @Column({ type: 'text', 'nullable': true })
    public middlename?: string;
    
    @Column({ type: 'text', 'nullable': true })
    public birthdate?: string;

    @Column({ type: 'text', 'nullable': true })
    public assessment?: string;

}
