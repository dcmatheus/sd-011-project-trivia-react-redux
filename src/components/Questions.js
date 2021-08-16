import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { scoreAction } from '../actions';
import Answers from './Answers';
import icon from '../icons/timer-icon.png';
import next from '../icons/next.png';

const oneSecond = 1000;
const four = 4;
const hard = 3;
const medium = 2;
const easy = 1;
const ten = 10;
const initValue = 30;

function Question({ newQuestion, nextFunc }) { // eslint-disable-line
  const { index, question, category, answers, difficulty } = newQuestion;
  const [timer, updateTimer] = useState(initValue);
  const [answered, updateAnswered] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { username, score, avatar } = user;
  const history = useHistory();

  const startTimer = useCallback(() => {
    if (!answered) {
      if (timer > 0) setTimeout(() => updateTimer(timer - 1), oneSecond);
      if (timer === 0) updateAnswered(true);
    }
  }, [answered, timer]);

  useEffect(() => (startTimer()), [timer, startTimer]);

  function nextPage() {
    updateTimer(initValue);
    updateAnswered(false);
    nextFunc();
  }

  function saveScore(finalScore) {
    const dataStorage = { ...JSON.parse(localStorage.getItem('state')) };
    dataStorage.player.score += finalScore;
    dataStorage.player.assertions += 1;
    dispatch(scoreAction(dataStorage.player.score));
    localStorage.setItem('state', JSON.stringify({ ...dataStorage }));
  }

  function addScore() {
    let newScore = 0;
    if (difficulty === 'easy') {
      newScore = (timer * easy) + ten;
    } else if (difficulty === 'medium') {
      newScore = (timer * medium) + ten;
    } else if (difficulty === 'hard') {
      newScore = (timer * hard) + ten;
    }
    const finalScore = score + newScore;
    saveScore(finalScore);
  }

  function addToRanking() {
    const { ranking } = localStorage;
    const player = { username, score, avatar };
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([player]));
    } else {
      const sortRanking = [...JSON.parse(ranking), player]
        .sort((element, element2) => element2.score - element.score);
      localStorage.setItem('ranking', JSON.stringify(sortRanking));
    }
    history.push('/feedback');
  }

  function handleClick(correct) {
    updateAnswered(true);
    if (correct) addScore();
  }

  return (
    <div className="questionsContainer">
      <div className="timerContainer">
        <img src={ icon } alt="timer" className="timer" />
        <span className="timer">{ timer }</span>
      </div>
      <h1 data-testid="question-text">{ question }</h1>
      <p data-testid="question-category">{ category }</p>
      <Answers answered={ answered } answers={ answers } onClick={ handleClick } />
      {(answered) && (
        <button
          type="button"
          onClick={ (index >= four) ? addToRanking : nextPage }
          data-testid="btn-next"
          className="nextBtn"
        >
          <img src={ next } alt="Próxima" className="nextImg" />
        </button>
      )}
    </div>
  );
}

Question.propTypes = {
  newQuestion: PropTypes.isRequired,
  nextFunc: PropTypes.func.isRequired,
};

export default Question;
