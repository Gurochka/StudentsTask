import { renderRoutes, RouteConfig } from 'react-router-config';
import { Home } from '../content/home';
import { AddStudent } from '../content/students/add';
import { EditStudent } from '../content/students/edit';
import { StudentResolver } from './resolvers/student';

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Home
    }, {
        path: '/students/add',
        exact: true,
        component: AddStudent
    }, {
        path: '/students/:studentId',
        component: StudentResolver(EditStudent)
    }, {
        component: Home
    }
];

export const RouterContent = renderRoutes(routes);
