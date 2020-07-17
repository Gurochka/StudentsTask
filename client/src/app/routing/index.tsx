import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from '../content/home';
import { AddStudent } from '../content/students/add';
import { EditStudent } from '../content/students/edit';
import { StudentResolver } from './resolvers/student';

export const RouterContent = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/students/add" exact component={AddStudent} />
        <StudentResolver path="/students/:studentId" component={EditStudent} />
        <Route component={Home} />
    </Switch>
);
