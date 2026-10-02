export default function AnswerGrid({
  answers,
  wrongAnswers,
  onChoose,
}) {
  return (
    <div className="answerGrid">
      {answers.map((answer) => {
        const isWrong = wrongAnswers.includes(
          answer.value
        );

        return (
          <button
            key={`${answer.value}-${answer.label}`}
            className={
              isWrong
                ? "answerButton wrongAttempt"
                : "answerButton"
            }
            disabled={isWrong}
            onClick={() => onChoose(answer)}
          >
            {answer.label}
          </button>
        );
      })}
    </div>
  );
}
