import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../../redux/actions/root.actions';
import { AppState } from '../../../../redux/reducers/root.reducers';
import { notify } from '../../../../redux/actions/notify.actions';
import { NotifyState } from '../../../../redux/reducers/notify.reducers';
import { View } from './view';
import { IStateProps } from './model';

export const Notifier = () => {
    const dispatch = useDispatch<AppDispatch>();
    const notifyOptions = useSelector<AppState, NotifyState>(state => state.notify);
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
