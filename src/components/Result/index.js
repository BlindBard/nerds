import React from "react";
import Button from "../Button";

const Result = ({ reset, correctAnswersCount, questionsCount }) => {
  return (
    <>
      <h2>{`${correctAnswersCount}/${questionsCount}`}</h2>
      <Button onClick={reset}>Повторити</Button>
    </>
  );
};

export default Result;
