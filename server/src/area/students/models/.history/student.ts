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
    public firstname: string;
    @Column('text')
    public lastname: string;
    @Column('text', {'nullable': true})
    public middlename: string;
    @Column('text', {'nullable': true})
    public birthdate: string;
    @Column('text', {'nullable': true})
    public assessment: string;
}
