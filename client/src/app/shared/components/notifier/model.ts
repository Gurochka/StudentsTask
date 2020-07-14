import { NotifyState } from '../../../../redux/reducers/notify';

export interface IStateProps {
   open: boolean;
   notifyOptions: NotifyState;
   onClose: () => void;
}
