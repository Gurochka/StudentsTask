import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { RouteConfigComponentProps } from 'react-router-config';

import { AppDispatch } from '../../../redux/actions';

import { getStudent } from '../../../redux/actions/students';

interface IPathParams {
    studentId: string;
}

export const StudentResolver = (Component: React.FC) => function StudentResolverWrapper (props: RouteConfigComponentProps<IPathParams>) {
    const dispatch = useDispatch<AppDispatch>();
    const [loaded, setLoaded] = useState<boolean | null>(null);

    const studentId = props.match.params.studentId;

    useEffect(() => {
        (async () => {
            try {
                await dispatch(getStudent(studentId));
                setLoaded(true);
            } catch (err) {
                dispatch(push('/students'));
            }
        })();
    }, [dispatch, studentId]);

    if (props.route && loaded === true) {
        return <Component />;
    }
    return null;
};
