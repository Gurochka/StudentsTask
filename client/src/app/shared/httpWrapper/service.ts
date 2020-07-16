import axios, { AxiosRequestConfig } from 'axios';
// import { stringify } from 'query-string';

import { HttpWrapperOptions } from './options';
import {
    showMessage,
    increaseBlockingCallCounter,
    decreaseBlockingCallCounter
} from '../../../redux/actions/httpWrapperActions';

import { store } from '../../../redux/store';
// import { Localstorage } from '../constants';
// import { AppState } from '../../../redux/reducers';

import { HttpStatusCode } from '../../../common/httpStatusCode';

const CancelToken = axios.CancelToken;
type RequestType = 'get' | 'post' | 'put' | 'delete';

const cancelRequestBecauseOfNewOne = 'cancel request because of new one';

// const initializeTimestamp = new Date().getTime();

// const minReloadingIntervalMs = 300000;
// const reloadAfterMs = 1000;

class InternalError {
    constructor(public response: any) {
        // do nothing
    }
}

export class HttpService {
    private cancelations: { [key: string]: any } = {};

    public showFanCounter = 0;

    public get<T>(url: string, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        const queryStringParams: any = {};
        if (httpWrapperOptions?.cacheQueryParams) {
            queryStringParams['_t'] = httpWrapperOptions.cacheQueryParams;
        }
        return this.processRequest<T>(url, 'get', null, httpWrapperOptions, queryStringParams);
    }

    public post<T = void>(url: string, data?: any, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        return this.processRequest<T>(url, 'post', data, httpWrapperOptions);
    }

    public put<T = void>(url: string, data?: any, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        return this.processRequest<T>(url, 'put', data, httpWrapperOptions);
    }

    public delete<T = void>(url: string, data?: any, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        return this.processRequest<T>(url, 'delete', data, httpWrapperOptions);
    }

    private processRequest<T>(
        url: string,
        method: RequestType,
        data?: any,
        httpWrapperOptions = new HttpWrapperOptions(),
        queryParams: any = null): Promise<T> {

        const result = new Promise<T>((resolve, reject) => {
            (async () => {
                if (httpWrapperOptions.wait) {
                    setTimeout(() => {
                        store.dispatch(increaseBlockingCallCounter());
                    }, httpWrapperOptions.waitTimeout);
                }

                // const state = store.getState() as AppState;
                const headers: any = {};
                // if (httpWrapperOptions.requestIdentificator) {
                //     headers['ppm-identificator'] = httpWrapperOptions.requestIdentificator;
                // }

                // const token = localStorage.getItem(Localstorage.token);
                // if (token) {
                //     headers['x-access-token'] = token;
                // }

                const axiosRequestConfig: AxiosRequestConfig = Object.assign({}, {
                    method,
                    withCredentials: false,
                    responseType: httpWrapperOptions.responseType,
                    timeout: httpWrapperOptions.timeout,
                    headers,
                    data: (data) ? data : undefined,
                    params: queryParams,
                });

                const normalizedUrl = this.normalizeUrl(url);
                try {
                    let res: any = null;
                    let callCounter = 0;
                    while (true) {
                        try {
                            if (httpWrapperOptions.requestSequenceIdentificator) {
                                if (this.cancelations[httpWrapperOptions.requestSequenceIdentificator]) {
                                    this.cancelations[httpWrapperOptions.requestSequenceIdentificator](cancelRequestBecauseOfNewOne);
                                    this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = null;
                                }
                                axiosRequestConfig.cancelToken = new CancelToken((c) => {
                                    if (httpWrapperOptions.requestSequenceIdentificator) {
                                        this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = c;
                                    }
                                });
                            }
                            const axiosPromise: Promise<any> = axios(normalizedUrl, axiosRequestConfig);
                            res = await axiosPromise;
                            if (res.status === HttpStatusCode.accepted) {
                                throw new InternalError(res);
                            }
                            if (httpWrapperOptions.requestSequenceIdentificator) {
                                this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = null;
                            }
                            break;
                        } catch (err) {
                            if (err.message === cancelRequestBecauseOfNewOne) {
                                res = {
                                    data: null
                                };
                                // console.warn('request canceled by next one');
                                break;
                            }

                            ++callCounter;
                            if (httpWrapperOptions.requestSequenceIdentificator) {
                                if (this.cancelations[httpWrapperOptions.requestSequenceIdentificator]) {
                                    // console.warn('request canceled by next try');
                                    this.cancelations[httpWrapperOptions.requestSequenceIdentificator]();
                                    this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = null;
                                }
                            }

                            if (err.code !== 'ECONNABORTED' || callCounter > httpWrapperOptions.extraTries) {
                                throw err;
                            }
                        }
                    }
                    this.showDialog(httpWrapperOptions, true, undefined);

                    // if (res && res.headers && res.headers['web-client-version']
                    //     && state.resources.settings
                    //     && res.headers['web-client-version'] !== state.resources.settings.webClientVersion
                    //     && ((new Date().getTime() - initializeTimestamp) > minReloadingIntervalMs)) {
                    //     setTimeout(() => location.reload(true), reloadAfterMs);
                    // }
                    // if (res && res.headers && res.headers['resource-version']) {
                    //     store.dispatch(checkVersion(+res.headers['resource-version']));
                    // }
                    resolve(res.data);
                } catch (reason) {
                    if (httpWrapperOptions.errors) {
                        let msg = reason.toString();
                        let status = (reason.response && reason.response.status) ? reason.response.status : HttpStatusCode.exception;

                        const body = (data) ? JSON.parse(JSON.stringify(data)) : null;
                        if (body && body.password) {
                            body.password = '******';
                        }
                        if (body && body.passwordConfirmation) {
                            body.passwordConfirmation = '******';
                        }
                        // let connectSymbol = '';
                        // if (normalizedUrl.includes('?')) {
                        //     connectSymbol = '&';
                        // } else if (queryParams && Object.getOwnPropertyNames(queryParams).length !== 0) {
                        //     connectSymbol = '?';
                        // }
                        // const query = `${normalizedUrl}${connectSymbol}${stringify(queryParams)}`;
                        // const error = {
                        //     body,
                        //     query: `${method} ${query}`,
                        //     error: undefined as string | undefined
                        //     // version: state.resources.settings ? state.resources.settings.webClientVersion : 'version not loaded'
                        // };

                        if (reason.code === 'ECONNABORTED') {
                            status = HttpStatusCode.timeout;
                        }
                        const msgFromServer = (reason.response && reason.response.data && reason.response.data.errorDetails)
                            ? reason.response.data.errorDetails : null;
                        msg = msgFromServer || msg;
                        if (status === HttpStatusCode.unauthorized) {
                            window.location.href = '/';
                        } else {
                            switch (status) {
                                case HttpStatusCode.badRequest: msg = msg || 'Произошла непредвиденная ситуация';
                                    break;
                                case HttpStatusCode.forbidden:
                                    // await store.dispatch(logout(false));
                                    msg = msg || 'В доступе отказано';
                                    break;
                                case HttpStatusCode.timeout: msg = 'Запрос не был обработан за отведенное время';
                                    break;
                                case HttpStatusCode.exception:
                                    msg = 'Упс. Произошла ошибка';
                                    if (msgFromServer) {
                                        msg += `. Описание: ${msgFromServer}.`;
                                    }
                                    break;
                                default:
                            }

                            // if (status !== HttpStatusCode.accepted) {
                            //     error.error = msg;
                            //     const errorRequestHeaders = JSON.parse(JSON.stringify(headers));
                            //     // errorRequestHeaders['ppm-identificator'] = newGuid();
                            //     const errorRequestConfig: AxiosRequestConfig = Object.assign({}, {
                            //         method: 'post' as Method,
                            //         responseType: 'json' as ResponseType,
                            //         timeout: httpWrapperOptions.timeout,
                            //         headers: errorRequestHeaders,
                            //         data: error,
                            //     });

                            //     // axios(this.normalizeUrl(appUrls.api_add_client_side_error), errorRequestConfig);
                            // }

                            this.showDialog(httpWrapperOptions, false, msg);
                        }
                    }
                    reject(reason.response || reason);
                }
                finally {
                    if (httpWrapperOptions.wait) {
                        store.dispatch(decreaseBlockingCallCounter());
                    }
                }
            })();
        });

        return result;
    }

    private showDialog(httpWrapperOptions: HttpWrapperOptions, success: boolean, text?: string) {
        if (success) {
            if (httpWrapperOptions.success) {
                store.dispatch(showMessage({
                    type: 'success',
                    message: httpWrapperOptions.successText || text || 'Какая то информация'
                }));
            }
        } else {
            if (httpWrapperOptions.errors) {
                store.dispatch(showMessage({
                    type: 'error',
                    message: httpWrapperOptions.errorText || text || 'Неопознанная ошибка'
                }));
            }
        }
    }

    private normalizeUrl(url: string): string {
        if (!url.startsWith('http')) {
            return `${process.env.REACT_APP_BACKEND_URL}${url}`;
        } else {
            return `${url}`;
        }
    }
}
