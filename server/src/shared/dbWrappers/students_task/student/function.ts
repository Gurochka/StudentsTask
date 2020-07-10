/*Codegen*/
// tslint:disable
/* eslint-disable */

import {createConnection, ConnectionOptions} from 'typeorm';

export const student_student_function_trigger_string= `CREATE OR REPLACE FUNCTION student.add_to_history_student_student() RETURNS TRIGGER AS $$ begin
IF (TG_OP='INSERT') THEN INSERT INTO \"student\".\"h_student\"( __id, __operation, __changedate
,id
,firstname
,lastname
,middlename
,birthdate
,assessment
)values (default,TG_OP,NOW()
,NEW.id,NEW.firstname,NEW.lastname,NEW.middlename,NEW.birthdate,NEW.assessment); return new;
ELSIF (TG_OP='UPDATE') THEN INSERT INTO \"student\".\"h_student\" ( __id, __operation, __changedate
,id
,firstname
,lastname
,middlename
,birthdate
,assessment
)values (default,TG_OP,NOW()
,NEW.id,NEW.firstname,NEW.lastname,NEW.middlename,NEW.birthdate,NEW.assessment); return new;
ELSIF (TG_OP='DELETE') THEN INSERT INTO \"student\".\"h_student\" ( __id, __operation, __changedate
,id
,firstname
,lastname
,middlename
,birthdate
,assessment
)values (default,TG_OP,NOW()
,OLD.id,OLD.firstname,OLD.lastname,OLD.middlename,OLD.birthdate,OLD.assessment); return old; end if; return null;
END;$$ LANGUAGE plpgsql;`

export async function createstudents_taskTriggerFuncsstudent() {
const pgp = require('pg-promise')({});
await pgp.end();
const connectionString = 'postgres://' + process.env.dbUsername + ':' +
process.env.dbPassword + '@' + process.env.dbHost + ':' + process.env.dbPort + '/' + process.env.dbBase;
const db = pgp(connectionString);

await db.none(student_student_function_trigger_string);
pgp.end();

}
