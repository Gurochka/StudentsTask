/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as faker from 'faker/locale/ru';
import * as dotenv from 'dotenv';
import * as pgPromise from 'pg-promise';

import { studentDBWrapper } from '../src/shared/dbWrappers/students_task/student/studentDBWrapper';
import { Student } from '../src/area/students/models/student';

import { AppState } from '../common/appState';
import { logger } from '../common/logger';

import { Assessment } from '../../common/model/enums/assessment';

const createDB = async (): Promise<void> => {
    const pgp = pgPromise({});
    let connectionString = `postgres://${process.env.dbUsername}:${process.env.dbPassword}@` +
                `${process.env.dbHost}:${process.env.dbPort}/postgres`;
    let db = pgp(connectionString);
    const res = await db.oneOrNone(`SELECT 1 FROM pg_database WHERE datname = '${process.env.dbBase}'`);
    if (res !== null) {
        logger.message(`DROP DATABASE ${process.env.dbBase} ...`);
        const dropStr = `DROP DATABASE ${process.env.dbBase}`;
        await db.query(dropStr);

        logger.message(`DROP DATABASE ${process.env.dbBase} complete`);
    }
    const str = `CREATE DATABASE ${process.env.dbBase}`;

    logger.message(`CREATE DATABASE ${process.env.dbBase} ...`);

    await db.query(str);
    await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    pgp.end();

    logger.message(`CREATE DATABASE ${process.env.dbBase} complete`);
    connectionString = `postgres://${process.env.dbUsername}:${process.env.dbPassword}@` +
    `${process.env.dbHost}:${process.env.dbPort}/${process.env.dbBase}`;
    db = pgp(connectionString);

    logger.message(`CREATE DATABASE SCHEMAS...`);
    await db.query(`CREATE SCHEMA student`);

    logger.message(`CREATE SCHEMAS complete`);
    pgp.end();
};

if (!process.env.dbHost) {
    const argvMaxLen = 2;
    if (process.argv.length > argvMaxLen) {
        dotenv.config({ path: process.argv[argvMaxLen] });
    } else {
        dotenv.config({ path: '.env' });
    }
}

const createStudent = async () => {
    const student = new Student();
    const gender = faker.random.number({ min: 0, max: 1 });
    student.firstName = faker.name.firstName(gender);
    student.lastName = faker.name.lastName(gender);
    student.assessment = Assessment[1];

    await studentDBWrapper.getEntityManager().save(student);
};

const initDB = async () => {
    await createDB();

    await studentDBWrapper.initialize(true, true);

    logger.message(`Initialize students ...`);

    for (let i = 0; i < 10; ++i) {
        await createStudent();
    }

    logger.message(`Initialize students complete`);

    await studentDBWrapper.close();
};

export const main = async () => {
    AppState.Begin();
    await initDB();
    AppState.End();
};

main();
