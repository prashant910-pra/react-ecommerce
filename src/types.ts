// src/types.ts

export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  export interface QuizProps {
    questions: Question[];
  }
  