import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { RouteConfigComponentProps } from 'react-router-config';

import { AppDispatch } from '../../../redux/actions';

import { getStudent } from '../../../redux/actions/students';

interface IPathParams {
    studentId: string;
}

interface IModel {
    component: React.FunctionComponent;
}

export const StudentResolver = (props: RouteConfigComponentProps<IPathParams>) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loaded, setLoaded] = useState<boolean | null>(null);

    const studentId = props.match.params.studentId;

    const getStudentAsync = useCallback(async () => {
        await dispatch(getStudent(studentId));
        return true;
    }, [studentId, dispatch]);

    useEffect(() => {
        getStudentAsync()
            .then((res) => setLoaded(res))
            .catch(() => {
                dispatch(push('/students'));
            });
    }, [dispatch, studentId, getStudentAsync]);

    if (props.route && loaded === true) {
        const { component: Component }: IModel = props.route.props;
        return <Component />;
    }
    return null;
};
