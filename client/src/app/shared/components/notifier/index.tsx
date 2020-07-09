import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState, Notify } from '../../../../redux/actions/root.actions';
import { View } from './view';
import { IStateProps } from './model';
import { notify } from '../../../../redux/actions/notify.actions';

export const Notifier = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notifyOptions = useSelector<AppState, Notify | null | undefined>(state => state.notify);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (notifyOptions) {
            setOpen(true);
        }
    }, [notifyOptions]);

    if (!notifyOptions) {
        return null;
    }

    const props: IStateProps = {
        open,
        notifyOptions,
        onClose: () => {
            setOpen(false);
            dispatch(notify(null));
        }
    };

    return (<View {...props} />);
};
