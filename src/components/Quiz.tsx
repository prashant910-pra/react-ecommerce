import React, { useState } from 'react';
import { QuizProps } from '../types';
import styles from './Quiz.module.css';

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [averageScore, setAverageScore] = useState(0);
  const [totalAttempt, setTotalAttempt] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState("");

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    setSelectedButton(option);
  };
  const isInteger = (value: string | number) => {
    
    return Number.isInteger(value);
  };
  const handlePlayAgain = () => {
  
     setTotalAttempt(totalAttempt+1)
   
     setCurrentQuestionIndex(0)
     setScore(0)
     setShowResult(false);
    }
  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      setAverageScore((averageScore+score))
 
    }

    setSelectedOption(null);
    setSelectedButton("")
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      
      
      
      setShowResult(true);
      
    }
  };

  if (showResult) {
    //
    
    
    return (
      <div className={styles.quizContainer}>
        <h2>Your score is: {score*100}/{questions.length*100}</h2>

        <button className="btn btn-primary" onClick={handlePlayAgain} >
        Play Again
      </button>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.question}>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <div key={index} className={styles.option}>
          <button className={selectedButton ===option ? 'btn btn-primary' : 'btn btn-outline-secondary'} onClick={() => handleOptionSelect(option)}>
            {option}
          </button>
        </div>
      ))}
      <button className="btn btn-success" onClick={handleNextQuestion} disabled={!selectedOption}>
        Next
      </button><br/>
      {averageScore && (isInteger(averageScore*100/totalAttempt))?<div>Average:{averageScore*100/totalAttempt}</div>:<div></div>}   </div>
  );
};

export default Quiz;
