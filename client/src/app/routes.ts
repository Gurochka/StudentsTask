import { renderRoutes, RouteConfig } from 'react-router-config';
import { Home } from './content/home';
import { AddStudent } from './content/students/add';
import { EditStudent } from './content/students/edit';

const routes: RouteConfig[] = [
    {
        path: '/',
        exact: true,
        component: Home
    }, {
        path: '/students/add',
        component: AddStudent
    }, {
        path: '/students/:student_id',
        component: EditStudent
    }, {
        component: Home
    }
];

export const RouterContent = renderRoutes(routes);
