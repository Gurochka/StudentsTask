/*Codegen*/
// tslint:disable
/* eslint-disable */

import {Entity, Column, PrimaryColumn, ColumnOptions, Index, PrimaryGeneratedColumn} from 'typeorm';
import 'reflect-metadata';

@Entity('h_student')
export class hStudent {
    @PrimaryGeneratedColumn()
    public __id?: number;

    @Column()
    public __operation: string;

    @Column('timestamp with time zone')
    @Index('ind_hStudent_changed_date')
    public __changedate: Date;
    @Column('integer' )
    public id: number;
    @Column('text')
    public first_name: string;
    @Column('text')
    public last_name: string;
    @Column('text', {'nullable': true})
    public middle_name: string;
    @Column('text', {'nullable': true})
    public birth_date: string;
    @Column('text', {'nullable': true})
    public assessment: string;
}
