import React, { useState, useEffect } from "react";
import checked from "../../../assets/checked.png";
import fail from "../../../assets/fail.png";
import "./quiz-card.css";

export const QuizCard = (props) => {
  const { order, text, select, isSelect, onSelectQuiz, isDisable, setIsFail } =
    props;
  const [isSelectCorrect, setIsSelectCorrect] = useState(1);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isSelect !== false) {
      if (text === select) {
        setIsSelectCorrect(2);
      }
    }
  }, [isSelect]);

  const handlerHoverChange = () => {
    if (!isDisable) {
      setIsHover(!isHover);
    }
  };

  const handleSelect = () => {
    if (text !== select) {
      setIsSelectCorrect(3);
      setIsFail(true);
    }
    onSelectQuiz(text);
  };

  return (
    <>
      <button
        onMouseEnter={handlerHoverChange}
        onMouseLeave={handlerHoverChange}
        disabled={isDisable}
        onClick={handleSelect}
        className={
          isSelectCorrect === 1
            ? `QuizCardContainer ${isHover}`
            : isSelectCorrect === 2
            ? "QuizCardContainer correct"
            : isSelectCorrect === 3
            ? "QuizCardContainer fail"
            : null
        }
      >
        <div className="QuizCardContainer__Info">
          <div className="QuizCardContainer__Info__order">
            <p>
              {order === 0 ? "A" : order === 1 ? "B" : order === 2 ? "C" : "D"}
            </p>
          </div>
          <div className="QuizCardContainer__Info__text">
            <p>{text}</p>
          </div>
        </div>
        {isSelectCorrect === 1 ? null : isSelectCorrect === 2 ? (
          <div className="QuizCardContainer__img">
            <img src={checked} alt="correct" />
          </div>
        ) : isSelectCorrect === 3 ? (
          <div className="QuizCardContainer__img">
            <img src={fail} alt="fail" />
          </div>
        ) : null}
      </button>
    </>
  );
};
