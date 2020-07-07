/* eslint-disable @typescript-eslint/unbound-method */
import * as dotenv from 'dotenv';

if (!process.env.dbHost) {
    dotenv.config({ path: '.env' });
}

import * as bodyParser from 'body-parser';
import * as express from 'express';
require('express-async-errors');

import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';

import { logger } from '../common/logger';
import { studentDBWrapper } from './shared/dbWrappers/students_task/student/studentDBWrapper';
import { StudentCtrl } from './area/students/controllers';

const app = express();

let swaggerDocument: any = null;
try {
    // eslint-disable-next-line global-require
    swaggerDocument = require('./swagger.json');
} catch {
    // empty
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: logger.stream,
}));

(async () => {
    await studentDBWrapper.initialize(false, false);
})().then(() => {
    const studentCtrl = new StudentCtrl();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/students', studentCtrl.getStudents);
    app.post('/students', studentCtrl.create);

    if (swaggerDocument) {
        const swaggerOptions = {
            explorer: false
        };
        app.use('/help/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
    }

    app.listen(process.env.PORT, () => {
        logger.message('App listening on port ' + process.env.PORT);
    });

});