import { renderRoutes, RouteConfig } from 'react-router-config';
import { Students } from './content/students';

const routes: RouteConfig[] = [
    {
        path: '/students',
        component: Students
    }, {
        component: Students // redirect to students if path not found
    }
];

export const RouterContent = renderRoutes(routes);
