import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { View } from './view';
import { IStateProps } from './model';
import { AppDispatch } from '../../../../redux/actions';
import { addStudent } from '../../../../redux/actions/students';
import { StudentViewModel } from '../../../../common/model/student/studentViewModel';

export const AddStudent = () => {
    const dispatch = useDispatch<AppDispatch>();

    const onAdd = async (data: StudentViewModel) => {
        await dispatch(addStudent(data));
        dispatch(push('/students'));
    };

    const props: IStateProps = {
        onAdd
    };

    return View(props);
};
