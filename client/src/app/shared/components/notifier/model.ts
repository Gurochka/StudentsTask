import { NotifyState } from '../../../../redux/reducers/notify.reducers';

export interface IStateProps {
   open: boolean;
   notifyOptions: NotifyState;
   onClose: () => void;
}
