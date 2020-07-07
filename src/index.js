import React from "react";
import ReactDOM from "react-dom";

import "normalize.css";
import "./index.scss";

import AppHeader from "./components/AppHeader";
import Question from "./components/Question";
import Result from "./components/Result";
import Wrapper from "./components/Wrapper";

const questions = {
  question_1: {
    question:
      "Як називається найбільш популярна снайперська гвинтівка у грі CS:GO?",
    answers: ["Fnatic", "Na`Vi", "Team Secret", "OG"],
    correct_answers: ["OG"],
  },
  question_2: {
    question:
      "Хто виграв головний турнір року по Dota 2 - The International 2019?",
    answers: ["Fnatic", "Na`Vi", "Team Secret", "OG"],
    correct_answers: ["OG"],
  },
  question_3: {
    question: "Скільки карт використовується на офіційних турнірах СS:GO?",
    answers: ["12", "24", "6", "7"],
    correct_answers: ["7"],
  },
  question_4: {
    question: "Найпопулярніша укарїнська кіберспортивна команда",
    answers: ["VP", "Na`Vi", "Astralis", "HR"],
    correct_answers: ["Na`Vi"],
  },
  question_5: {
    question: "Яка гра є головним конкурентом дисципліни DOTA2",
    answers: ["LOL", "WOW", "Startcraft", "Battlerite"],
    correct_answers: ["LOL"],
  },
};

const getInitialState = () => ({ currentQuestionIndex: 0, userAnswers: {} });

class App extends React.Component {
  state = getInitialState();
  submitAnswer = (questionId, isAnswerCorrect) => {
    this.setState({
      userAnswers: {
        ...this.state.userAnswers,
        [questionId]: isAnswerCorrect,
      },
      currentQuestionIndex: this.state.currentQuestionIndex + 1,
    });
  };
  reset = () => {
    this.setState(getInitialState());
  };
  render() {
    const questionsArr = Object.entries(questions).map((question) => {
      return {
        questionId: question[0],
        ...question[1],
      };
    });
    const question = questionsArr[this.state.currentQuestionIndex];
    const correctAnswersCount = Object.values(this.state.userAnswers).filter(
      (answer) => answer
    ).length;
    const questionsCount = questionsArr.length;
    return (
      <Wrapper>
        <AppHeader />
        {question ? (
          <Question
            key={question.questionId}
            questionsCount={questionsCount}
            questionIndex={this.state.currentQuestionIndex}
            questionId={question.questionId}
            questionText={question.question}
            answers={question.answers}
            correctAnswers={question.correct_answers}
            submitAnswer={this.submitAnswer}
            isMultipleChoice={question.correct_answers.length > 1}
          />
        ) : (
          <Result
            questionsCount={questionsCount}
            correctAnswersCount={correctAnswersCount}
            reset={this.reset}
          />
        )}
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
