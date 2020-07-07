import React from 'react';
import { RouterContent } from './routes';
import { BrowserRouter } from 'react-router-dom';

export const View: React.FC = () => {
    return (
        <BrowserRouter>
            { RouterContent }
        </BrowserRouter>
    );
};
