import React, { useState, useEffect } from "react";
const Context = React.createContext({});
export const QuizContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [highScore, setHighScore] = useState([]);

  useEffect(() => {
    const countData = JSON.parse(localStorage.getItem("count"));
    if (countData) {
      setCount(countData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    const highScoreData = JSON.parse(localStorage.getItem("highScore"));
    if (highScoreData) {
      setHighScore(highScoreData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  const getHighScore = () => {
    return Math.max(...highScore);
  };

  return (
    <Context.Provider
      value={{
        count,
        setCount,
        isNext,
        setIsNext,
        highScore,
        setHighScore,
        getHighScore,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
