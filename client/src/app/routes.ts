import { renderRoutes, RouteConfig } from 'react-router-config';
import { Home } from './content/home';
import { AddStudent } from './content/students/add';
import { EditStudent } from './content/students/edit';

const routes: RouteConfig[] = [
    {
        path: '/',
        component: Home
    },{
        path: '/students/:student_id',
        component: EditStudent
    },{
        path: '/students/add',
        component: AddStudent
    },{
        component: Home // redirect to home if path not found
    }
];

export const RouterContent = renderRoutes(routes);
