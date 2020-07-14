import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getResources } from '../../../../redux/actions/resources';
import { AppDispatch } from '../../../../redux/actions';

export const ResourceProvider = ({ children }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getResources());
    }, [dispatch]);

    return children;
};
