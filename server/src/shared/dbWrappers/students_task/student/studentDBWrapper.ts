/*Codegen*/
// tslint:disable
/* eslint-disable */
import {createConnection, Connection, getManager, EntityManager} from 'typeorm';

import { Student } from '../../../../area/students/models/student';
import { hStudent } from '../../../../area/students/models/.history/student';
import { createstudents_taskTriggerFuncsstudent } from './function';
import { createstudents_taskTriggersstudent } from './trigger';

export class studentDBWrapper {

    private static connection: Connection;

    public static async initialize(dropSchema?: boolean, sync?: boolean): Promise<void> {
        await this.close();

        if (! dropSchema) {
            dropSchema = false;
        }
        if (! sync) {
            sync = false;
        }

        this.connection = await this.createTables(dropSchema, sync);
        if (dropSchema) {
            await createstudents_taskTriggerFuncsstudent();
            await createstudents_taskTriggersstudent();
        }
    }

    private static async createTables(dropSchema?: boolean, sync?: boolean) {
        return await createConnection({
            name: 'student',
            type: 'postgres',
            replication: {
                master: {
                    host:  process.env.dbHost,
                    port: parseInt(process.env.dbPort, 10),
                    username:  process.env.dbUsername,
                    password: process.env.dbPassword,
                    database: process.env.dbBase
                },
                slaves: []
            },
            entities: [
            Student
            , hStudent
],
      schema: 'student',
      synchronize: sync,
      dropSchema: dropSchema
      });
    }
    public static getEntityManager (): EntityManager {
        return getManager('student');
    }

    public static async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
