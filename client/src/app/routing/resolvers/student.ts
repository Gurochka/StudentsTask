import { compose, lifecycle, withState, renderNothing, branch } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { push } from 'connected-react-router';

import { store } from '../../../redux/store';
import { StudentViewModel } from '../../../common/model/student/studentViewModel';
import { getStudent } from '../../../redux/actions/students';

type PathParamsType = {
    studentId: string;
}

interface IModel {
    student: StudentViewModel;
    setLoaded?: (state: boolean) => void;
    loaded?: boolean;
}

type propType = IModel & RouteComponentProps<PathParamsType>;

export const StudentResolver = (viewComponent: any) => {

    const redux = connect<IModel, {}, {}, any>(
        (state) => ({
            student: state.students.active
        })
    );

    const stateLoaded = withState('loaded', 'setLoaded', null);

    const initClient = lifecycle<propType, {}, {}>({
        async componentDidMount() {
            await new Promise((resolve, reject) => {
                (
                    async () => {
                        const student_id = this.props.match.params.studentId;
                        try {
                            if (!this.props.student || this.props.student.id !== parseInt(student_id)) {
                                await store.dispatch(getStudent(student_id));
                            }
                        } catch (err) {
                            reject(err);
                            store.dispatch(push(`/students`));
                        }
                        resolve();
                    }
                )();
            });
            if (this.props.setLoaded) {
                this.props.setLoaded(true);
            }
        },
    });

    const guard = branch(
        (params: IModel) => (!params.loaded),
        renderNothing,
    );

    return compose(
        redux,
        stateLoaded,
        initClient,
        guard,
        withRouter
    )(viewComponent);
};
