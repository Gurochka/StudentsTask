import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/actions';
import { getActiveStudent } from '../../../redux/actions/students';

interface IModel {
    studentId: string | number;
}

export const useCheckStudent = (studentId: string | number | null) => {
    const dispatch = useDispatch<AppDispatch>();
    // const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const getStudent = async () => {
            if (!studentId) {
                return;
            }
            // setLoading(true);
            try {
                await dispatch(getActiveStudent(studentId));
            } catch (err) {
                setError(true);
            } finally {
                // setLoading(false)
            }
        };

        getStudent();

    }, [dispatch, studentId]);

    return error;
    // return [loading, error];
};
