import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../redux/actions';
import { View } from './view';
import { IProps } from './model';

export const Home = () => {
    const dispatch = useDispatch<AppDispatch>();

    const onClickAdd = () => dispatch(push('/students/add'));

    const props: IProps = {
        onClickAdd
    };

    return View(props);
};
