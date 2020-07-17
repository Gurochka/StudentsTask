import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Route, RouteProps, match } from 'react-router-dom';

import { AppDispatch } from '../../../redux/actions';

import { getStudent } from '../../../redux/actions/students';

interface IPathParams {
    studentId: string;
}

type matchType = match<IPathParams>;

interface IModel extends RouteProps {
    component: React.FunctionComponent;
    computedMatch?: matchType;
}

export const StudentResolver = ({ component: Component, ...rest }: IModel) => {
    const dispatch = useDispatch<AppDispatch>();

    const studentId = rest.computedMatch ? rest.computedMatch.params.studentId : null;

    const [loaded, setLoaded] = useState<boolean | null>(null);

    const getStudentAsync = useCallback(async () => {
        if (!studentId) {
            return false;
        }
        await dispatch(getStudent(studentId));
        return true;
    }, [studentId, dispatch]);

    useEffect(() => {
        if (!studentId) {
            return;
        }
        getStudentAsync()
            .then((res) => setLoaded(res))
            .catch(() => {
                dispatch(push('/students'));
            });
    }, [dispatch, studentId, getStudentAsync]);

    const renderFn = () => {
        if (loaded === true) {
            return <Component />;
        }
        return null;
    };

    return <Route {...rest} render={renderFn} />;
};
