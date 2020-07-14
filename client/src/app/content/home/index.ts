import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../redux/actions';
import { View } from './view';
import { IProps } from './model';

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    const props: IProps = {
        onClickAdd: () => dispatch(push('/students/add'))
    };

    return View(props);
};
