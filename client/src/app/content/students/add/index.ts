import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { View } from './view';
import { IStateProps } from './model';
import { AppDispatch } from '../../../../redux/actions';
import { addStudent } from '../../../../redux/actions/students';

export const AddStudent = () => {
    const dispatch = useDispatch<AppDispatch>();

    const props: IStateProps = {
        onAdd: async (data) => {
            await dispatch(addStudent(data));
            dispatch(push('/students'));
        }
    };

    return View(props);
};
