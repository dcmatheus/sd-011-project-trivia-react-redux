import { LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  username: '',
  avatar: '',
  score: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      username: action.username,
      avatar: action.avatar,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default userReducer;
