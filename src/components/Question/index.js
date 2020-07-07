import React from "react";
import cn from "classnames";
import Button from "../Button";
import styles from "./styles.module.scss";

export default class Question extends React.Component {
  state = {
    userAnswers: {},
  };
  handleSubmit = () => {
    const { correctAnswers, questionId, submitAnswer } = this.props;
    const { userAnswers } = this.state;
    const userAnswersArr = Object.entries(userAnswers).reduce(
      (acc, [k, v]) => (v ? acc.concat(k) : acc),
      []
    );
    const isAnswerCorrect =
      userAnswersArr.length === correctAnswers.length &&
      userAnswersArr.every((answer) => correctAnswers.includes(answer));
    submitAnswer(questionId, isAnswerCorrect);
  };
  handleCheck = (event) => {
    if (this.props.isMultipleChoice) {
      this.setState({
        userAnswers: {
          ...this.state.userAnswers,
          [event.target.value]: event.target.checked,
        },
      });
    } else {
      this.setState({
        userAnswers: {
          [event.target.value]: true,
        },
      });
    }
  };
  render() {
    const {
      questionsCount,
      questionIndex,
      questionText,
      answers,
      isMultipleChoice,
    } = this.props;
    const isNextEnabled = Object.keys(this.state.userAnswers).length > 0;
    return (
      <>
        <h3>Запитання №{questionIndex + 1}</h3>
        <h4>{questionText}</h4>
        <div className={styles["answers-row"]}>
          {answers.map((answer) => (
            <label className={cn(styles.check, styles.option)} key={answer}>
              {isMultipleChoice ? (
                <>
                  <input
                    className={styles.check__input}
                    type="checkbox"
                    value={answer}
                    onChange={this.handleCheck}
                    checked={!!this.state.userAnswers[answer]}
                  />
                  <span className={styles.check__radio} />
                </>
              ) : (
                <>
                  <input
                    className={styles.check__input}
                    type="radio"
                    name="radio"
                    value={answer}
                    onChange={this.handleCheck}
                  />
                  <span className={styles.check__check_box} />
                </>
              )}
              {answer}
            </label>
          ))}
          <div className={styles["answers-action"]}>
            <span className={styles.counter}>
              {questionIndex + 1}/{questionsCount}
            </span>
            <Button onClick={this.handleSubmit} disabled={!isNextEnabled}>
              Продовжити
            </Button>
          </div>
        </div>
      </>
    );
  }
}
