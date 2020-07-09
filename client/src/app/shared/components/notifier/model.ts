import { Notify } from '../../../../redux/actions/root.actions';

export interface IStateProps {
   open: boolean;
   notifyOptions: Notify;
   onClose: () => void;
}
