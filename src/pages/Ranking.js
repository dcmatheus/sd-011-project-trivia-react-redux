import React from 'react';
import { Link } from 'react-router-dom';
import '../style/ranking.css';

function Ranking() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return (
    <div className="rankingPage">
      <h1 data-testid="ranking-title">Ranking</h1>
      {ranking.map((element, index) => (
        <div key={ index } className="rankingItem">
          <h2>{index + 1}</h2>
          <img
            src={ element.avatar }
            alt="Foto do jogador"
            style={ { width: '150px' } }
          />
          <h3 data-testid={ `player-name-${index}` }>{element.username}</h3>
          <p data-testid={ `player-score-${index}` }>{element.score}</p>
        </div>))}
      <Link to="/" data-testid="btn-go-home">
        <input type="button" value="Tela inicial" />
      </Link>
    </div>
  );
}

export default Ranking;
