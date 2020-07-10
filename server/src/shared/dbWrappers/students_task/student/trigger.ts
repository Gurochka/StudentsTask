/*Codegen*/
// tslint:disable
/* eslint-disable */

import { hStudent } from '../../../../area/students/models/.history/student';
import {createConnection, ConnectionOptions} from 'typeorm';

const pgPromise = require('pg-promise');

export const student_student_trigger_string = 'create trigger add_to_student_h_student after insert or delete or update on "student"."student" for each row execute procedure student.add_to_history_student_student();';

export async function createstudents_taskTriggersstudent() {
    const pgp = pgPromise({});
    await pgp.end();
    const connectionString = 'postgres://' + process.env.dbUsername + ':' +
    process.env.dbPassword + '@' + process.env.dbHost + ':' + process.env.dbPort + '/' + process.env.dbBase;
    const db = pgp(connectionString);

    await db.none(student_student_trigger_string);
    pgp.end();
}
