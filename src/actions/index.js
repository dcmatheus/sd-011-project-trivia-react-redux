import { getGravatar } from '../services/api';

export const LOGIN = 'LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const login = (username, avatar) => ({
  type: LOGIN,
  username,
  avatar,
});

export const loginAction = (username, email) => (dispatch) => {
  getGravatar(email).then((response) => dispatch(login(username, response.url)));
};

export const scoreAction = (score) => ({
  type: UPDATE_SCORE,
  score,
});
