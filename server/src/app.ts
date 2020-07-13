/* eslint-disable @typescript-eslint/unbound-method */
import * as dotenv from 'dotenv';
import * as cors from 'cors';

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
import { ResourcesCtrl } from './area/resources/controllers';

const app = express();
app.use(cors());

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
    const resourcesCtrl = new ResourcesCtrl();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.route('/students')
        .get(studentCtrl.getStudents)
        .post(studentCtrl.create);

    app.route('/students/:studentId')
        .get(studentCtrl.getActiveStudent)
        .put(studentCtrl.update)
        .delete(studentCtrl.remove);

    app.route('/resources')
        .get(resourcesCtrl.getResources);

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
