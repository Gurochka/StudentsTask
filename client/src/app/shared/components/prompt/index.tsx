import React from 'react';

import { View } from './view';
import { IPromptProps, IStateProps } from './model';

export const Prompt = (props: IPromptProps) => {
    const [agreed, setAgreed] = React.useState(false);

    const stateProps = {
        agreed: agreed,
        onClickAgree: () => {
            setAgreed(true);
            props.onAgree();
        } 
    }
    const mergedProps: IStateProps = { ...props, ...stateProps };

    return (<View {...mergedProps} />);
}
