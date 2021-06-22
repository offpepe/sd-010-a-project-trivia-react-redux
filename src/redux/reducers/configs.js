const INITIAL_STATE = {
  amount: 5,
  time: 30,
  type: '',
  category: '',
  difficulty: '',
};

export default function configs(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CHANGE_CONFIGS':
    state = action.configs;
    return state;
  default:
    return state;
  }
}
