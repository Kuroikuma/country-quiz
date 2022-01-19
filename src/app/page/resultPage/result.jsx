import "./result.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout/layout";
import CountContext from "../../context/quiz.context";
import logo from "../../../assets/undraw_winners_ao2o2.svg";

export const ResultPage = () => {
  const { count, setCount, isNext, setIsNext, getHighScore, setHighScore } =
    useContext(CountContext);

  useEffect(() => {
    setHighScore((prevHighScore) => [...prevHighScore, count]);
  }, []);

  const navigate = useNavigate();
  const onStart = () => {
    setCount(0);
    setIsNext(!isNext);
    navigate("/home");
  };
  return (
    <>
      <Layout />
      <div className="ResultContainer">
        <div className="ResultContainer__Content">
          <h1>Country quiz</h1>
          <div className="ResultContainer__Content__Card">
            <div className="ResultContainer__Content__Card__img">
              <img src={logo} alt="cagaste" />
            </div>
            <div className="ResultContainer__Content__Card__info">
              <h2>Results</h2>
              <p>
                You got <span>{count}</span> correct answers
              </p>
              {getHighScore() > count ? (
                <p>
                  High <span>{getHighScore()}</span> Score
                </p>
              ) : (
                <p>
                  New High <span>{count}</span> Score
                </p>
              )}
            </div>
            <div className="ResultContainer__Content__Card__button">
              <button onClick={onStart}>Try again</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
