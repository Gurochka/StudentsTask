import React from 'react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../redux/actions';
import { View } from './view';

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (<View onClickAdd={() => dispatch(push('/students/add'))} />);
};
