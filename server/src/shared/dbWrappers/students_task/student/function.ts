/*Codegen*/
// tslint:disable
/* eslint-disable */

import {createConnection, ConnectionOptions} from 'typeorm';

export const student_student_function_trigger_string= `CREATE OR REPLACE FUNCTION student.add_to_history_student_student() RETURNS TRIGGER AS $$ begin
IF (TG_OP='INSERT') THEN INSERT INTO \"student\".\"h_student\"( __id, __operation, __changedate
,id
,first_name
,last_name
,middle_name
,birth_date
,assessment
)values (default,TG_OP,NOW()
,NEW.id,NEW.first_name,NEW.last_name,NEW.middle_name,NEW.birth_date,NEW.assessment); return new;
ELSIF (TG_OP='UPDATE') THEN INSERT INTO \"student\".\"h_student\" ( __id, __operation, __changedate
,id
,first_name
,last_name
,middle_name
,birth_date
,assessment
)values (default,TG_OP,NOW()
,NEW.id,NEW.first_name,NEW.last_name,NEW.middle_name,NEW.birth_date,NEW.assessment); return new;
ELSIF (TG_OP='DELETE') THEN INSERT INTO \"student\".\"h_student\" ( __id, __operation, __changedate
,id
,first_name
,last_name
,middle_name
,birth_date
,assessment
)values (default,TG_OP,NOW()
,OLD.id,OLD.first_name,OLD.last_name,OLD.middle_name,OLD.birth_date,OLD.assessment); return old; end if; return null;
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
