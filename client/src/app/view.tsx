import React from 'react';
import { RouterContent } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export const View: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                { RouterContent }
            </BrowserRouter>
        </Provider>
    );
};
