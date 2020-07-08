import React from 'react';

import { View } from './view';
import { IStateProps } from './model';

export const AddStudent = () => {
    const props: IStateProps = {
        onAdd: (data) => { console.log('add student:', data); }
    };

    return React.useMemo(() => View(props), [props]);
};
