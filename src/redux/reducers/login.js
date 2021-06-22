import { LOGIN, USER_DATA, RECEIVE_QUESTS } from '../actions/index';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  questions: '',
};

function tokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    window.localStorage.setItem('token', JSON.stringify(action.token));
    return { ...state, token: action.token };
  case USER_DATA:
    window.localStorage.setItem('state',
      JSON.stringify({ player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: action.email } }));
    return { ...state, name: action.name, email: action.email };
  case RECEIVE_QUESTS:
    return { ...state, questions: action.questions.results };
  default:
    return state;
  }
}

export default tokenReducer;
