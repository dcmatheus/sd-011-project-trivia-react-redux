import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import Question from '../components/Questions';
import '../style/game.css';

function randomAnswers(array) {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

async function generateQuestions() {
  const apiQuestions = await getQuestions();
  const results = apiQuestions.map((element, index) => {
    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = element;
    const newCorrectAnswer = { answer: correctAnswer, correct: true };
    const newIncorrectAnswers = incorrectAnswers
      .map((answer) => ({ answer, correct: false }));
    const answers = randomAnswers([newCorrectAnswer, ...newIncorrectAnswers]);
    return {
      index,
      question,
      category,
      answers,
      difficulty,
    };
  });
  return results;
}

function Game() {
  const [questions, addQuestions] = useState(false);
  const [index, someIndex] = useState(0);

  const callback = useCallback(async () => {
    addQuestions(await generateQuestions());
  }, [addQuestions]);

  useEffect(() => {
    callback();
  }, [callback]);

  function nextQuestion() {
    const four = 4;
    if (index < four) {
      someIndex(index + 1);
    }
  }

  return (
    <div className="gameContainer">
      <Header />
      { (!questions) ? <p>loading...</p> : (
        <Question newQuestion={ questions[index] } nextFunc={ nextQuestion } />
      )}
    </div>
  );
}

export default Game;
