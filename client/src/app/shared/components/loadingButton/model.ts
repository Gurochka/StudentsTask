import * as React from 'react';

export interface IStateProps {
   loading: boolean;
   children: React.ReactNode;
   [key: string]: any;
}
