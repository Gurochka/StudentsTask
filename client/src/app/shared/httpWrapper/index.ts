import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../../../redux/actions';
import { AppState } from '../../../redux/reducers';
import { showMessage } from '../../../redux/actions/httpWrapperActions';
import { MessageState } from '../../../redux/reducers/httpWrapper/message';
import { View, IModel } from './view';
import { HttpService } from './service';
import { HttpWrapperOptions } from './options';

const HttpWrapper = () => {
    const dispatch = useDispatch<AppDispatch>();
    const message = useSelector<AppState, MessageState>(state => state.httpWrapper.message);

    const onClose = () => dispatch(showMessage(null));

    const props: IModel = {
        message,
        onClose
    };

    return View(props);
};

const httpService = new HttpService();
export { HttpWrapper, httpService, HttpWrapperOptions };
