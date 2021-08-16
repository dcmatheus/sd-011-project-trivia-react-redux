import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Feedback() {
  const { score, assertions } = JSON.parse(localStorage.getItem('state')).player;
  const baseNumber = 3;
  return (
    <>
      <Header />
      <div>
        <h1 data-testid="feedback-text">
          { assertions >= baseNumber ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h1>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{ assertions }</span>
          {' '}
          questões!
        </p>
        <p>
          Um total de
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos.
        </p>
        <div>
          <Link to="/ranking">
            <input
              style={ { backgroundColor: '#65B3AD' } }
              type="button"
              data-testid="btn-ranking"
              value="Ver Ranking"
            />
          </Link>
          <Link to="/">
            <input
              style={ { backgroundColor: '#65B3AD' } }
              type="button"
              data-testid="btn-play-again"
              value="Jogar Novamente"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Feedback;
