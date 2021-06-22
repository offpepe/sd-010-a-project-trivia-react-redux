export const LOGIN = 'LOGIN';
export const RECEIVE_QUESTS = 'RECEIVE_QUESTS';
export const USER_DATA = 'USER_DATA';
export const CHANGE_CONFIGS = 'CHANGE_CONFIGS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const receiveToken = (token) => ({ type: LOGIN, token });

export const loginAction = (name, email) => ({
  type: USER_DATA, name, email });

export const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTS, questions });

export const changeConfigs = (configs) => ({ type: CHANGE_CONFIGS, configs });

export const updateScoreAction = (score, assertions) => (
  { type: UPDATE_SCORE, score, assertions });

export const resetScoreAction = () => ({
  type: RESET_SCORE,
});

export const fetchToken = (configs) => async (dispatch) => {
  const { amount, category, difficulty, type } = configs;
  console.log(configs);
  const tokenJson = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await tokenJson.json();
  dispatch(receiveToken(token));
  const questionsJson = await
  fetch(`https://opentdb.com/api.php?amount=${amount}${category}${difficulty}${type}&token=${token.token}`);
  const questions = await questionsJson.json();
  console.log(questions);
  dispatch(receiveQuestions(questions));
};

export const buttonLoginAction = (
  name, email, configs,
) => async (
  dispatch) => {
  dispatch(loginAction(name, email));
  dispatch(fetchToken(configs));
};
