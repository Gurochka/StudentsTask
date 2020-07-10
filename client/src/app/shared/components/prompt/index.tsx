import React from 'react';

import { View } from './view';
import { IPromptProps, IStateProps } from './model';

export const Prompt = (props: IPromptProps) => {
    const [agreed, setAgreed] = React.useState(false);

    const stateProps = {
        agreed,
        onClickAgree: async () => {
            setAgreed(true);
            await props.onAgree();
            setAgreed(false);
        }
    };
    const mergedProps: IStateProps = { ...props, ...stateProps };

    return (<View {...mergedProps} />);
};
