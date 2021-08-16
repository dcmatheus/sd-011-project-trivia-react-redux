import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../actions';
import { saveToken, saveState } from '../services/storage';
import '../style/login.css';
import logo from '../icons/trivia.png';
import icon from '../icons/settings-icon.png';

function Login() {
  const [email, changeEmail] = useState('');
  const [name, changeName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    saveState({});
    dispatch({ type: 'UPDATE_SCORE', score: 0 });
  });

  function initGame() {
    saveToken();
    dispatch(loginAction(name, email));
    const player = { name, assertions: 0, score: 0, gravatarEmail: email };
    saveState({ player });
    history.push('/game');
  }

  return (
    <div className="loginPage">
      <img src={ logo } className="App-logo" alt="logo" />
      <form>
        <input
          data-testid="input-player-name"
          placeholder="Nome"
          id="Name"
          onChange={ ({ target }) => changeName(target.value) }
        />
        <input
          data-testid="input-gravatar-email"
          placeholder="Email"
          id="Email"
          onChange={ ({ target }) => changeEmail(target.value) }
        />
        <input
          data-testid="btn-play"
          type="button"
          disabled={ !(email && name) }
          onClick={ initGame }
          value="Jogar"
          className="playButton"
        />
      </form>
      <Link to="/settings" data-testid="btn-settings">
        <img src={ icon } alt="Configurações" id="config" style={ { height: '28px' } } />
      </Link>
    </div>
  );
}

export default Login;
