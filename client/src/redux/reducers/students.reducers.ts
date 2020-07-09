import { ActionType, BaseAction } from '../actions/root.actions';
import { combineReducers } from 'redux';
import { StudentViewModel } from '../../common/model/student/studentViewModel';

const activeStudent = (state: StudentViewModel | null = null, action: BaseAction<StudentViewModel>) => {
    switch (action.type) {
        case ActionType.SET_STUDENT:
            return action.payload;
        default:
            return state;
    }
};

const studentsList = (state: StudentViewModel[] | null = null, action: BaseAction<StudentViewModel[]>) => {
    switch (action.type) {
        case ActionType.SET_STUDENTS:
            return action.payload;
        default:
            return state;
    }
};

export const studentsReducer = combineReducers({
    active: activeStudent,
    list: studentsList
});


// + Еще один вопрос по стору: как выбирать конкретного студента? Правильно ли каждый раз его загружать из базы? Или можно как-то pick-ать его из списка? (или это будет слишком... слишком?)

// Как вообще вы пишете сторы, ведь для списка нужно еще обычно loading и пагинацию?
// и вопрос по ошибкам - как их обрабатывать? Только каким-то общим компонентом типа
