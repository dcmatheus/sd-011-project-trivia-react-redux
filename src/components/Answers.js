import React from 'react';
import PropTypes from 'prop-types';

function Answers({ answers, answered, onClick }) {
  return (
    <div className="answers">
      { answers.map(({ answer, correct }, index) => {
        if (correct) {
          return (
            <button
              key={ index }
              data-testid="correct-answer"
              type="button"
              disabled={ answered }
              onClick={ () => onClick(true) }
              className={ answered ? 'right' : 'white' }
            >
              {answer}
            </button>
          );
        }
        return (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            disabled={ answered }
            className={ answered ? 'wrong' : 'white' }
            onClick={ () => onClick(false) }
          >
            {answer}
          </button>
        );
      }) }
    </div>
  );
}

Answers.propTypes = {
  answers: PropTypes.isRequired,
  answered: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Answers);
