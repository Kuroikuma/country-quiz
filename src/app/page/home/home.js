import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getContries } from "../../../services/countries.services";
import CountContext from "../../context/quiz.context";
import { HomeView } from "./home.jsx";

export const Home = () => {
  const [capitals, setCapitals] = useState([]);
  const [pais, setPais] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [currentCity, setCurrentCity] = useState("");
  const [currentPais, setCurrentPais] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [fullData, setFullData] = useState([]);
  const [banderas, setBanderas] = useState([]);
  const [currentBandera, setCurrentBandera] = useState("");
  const [quizType, setQuizType] = useState(0);
  const { setCount, count } = useContext(CountContext);
  const navigate = useNavigate();

  function getRandomArbitrary(min, max) {
    let numero = Math.random() * (max - min) + min;
    return Math.floor(numero);
  }

  /*   Extrayendo todos los 4 item random en un solo array por que algunas cosas no me deja hacerlas de un solo en el mismo uef */

  useEffect(() => {
    let random = Math.round(Math.random() * (1 - 0) + 0);
    setQuizType(random);

    if (quizType === 0) {
      getContries().then((data) => {
        for (let index = 0; index < 4; index++) {
          let random = getRandomArbitrary(0, 249);
          if (data[random].name.common && data[random].capital) {
            setFullData((prevPais) => [...prevPais, data[random]]);
          } else {
            index--;
          }
        }
        setIsLoading(false);
      });
    } else if (quizType === 1) {
      getContries().then((data) => {
        for (let index = 0; index < 4; index++) {
          let random = getRandomArbitrary(0, 249);
          if (data[random].name.common && data[random].flags.svg) {
            setFullData((prevPais) => [...prevPais, data[random]]);
          } else {
            index--;
          }
        }
        setIsLoading(false);
      });
    }
  }, [isNext]);

  /* extrayendo de fullData las partes pertenecientes a cada estado */
  useEffect(() => {
    if (quizType === 0) {
      for (let index = 0; index < fullData.length; index++) {
        setCapitals((prevCapitals) => [
          ...prevCapitals,
          fullData[index].capital,
        ]);
        setPais((prevPais) => [...prevPais, fullData[index].name.common]);
        if (index === 3) {
          setIsLoading2(false);
        }
      }
    } else if (quizType === 1) {
      for (let index = 0; index < fullData.length; index++) {
        setPais((prevPais) => [...prevPais, fullData[index].name.common]);
        setBanderas((prevPais) => [...prevPais, fullData[index].flags.png]);
        if (index === 3) {
          setIsLoading2(false);
        }
      }
    }
  }, [isLoading]);

  /* extrayendo el current de pertecientes */
  useEffect(() => {
    if (quizType === 0) {
      const array = [...capitals];
      const array2 = [...pais];
      let random = getRandomArbitrary(0, array.length);
      setCurrentCity(array[random]);
      setCurrentPais(array2[random]);
    } else if (quizType === 1) {
      const array = [...pais];
      const array2 = [...banderas];
      let random = getRandomArbitrary(0, array.length);
      setCurrentPais(array[random]);
      setCurrentBandera(array2[random]);
    }
  }, [isLoading2]);

  const onNext = () => {
    if (isFail) {
      navigate("/result");
    } else {
      setCapitals([]);
      setPais([]);
      setCurrentCity("");
      setCurrentPais("");
      setCurrentBandera("");
      setBanderas([]);
      setFullData([]);
      setIsLoading(true);
      setIsLoading2(true);
      setIsDisable(false);
      setIsSelect(false);
      setIsNext(!isNext);
    }
  };

  const handleIsSelect = (text) => {
    setIsSelect(true);
    setIsDisable(true);
    if (text === currentPais) {
      setCount(count + 1);
    }
  };

  return (
    <HomeView
      currentBandera={currentBandera}
      quizType={quizType}
      isLoading={isLoading2}
      isSelect={isSelect}
      currentPais={currentPais}
      capitals={capitals}
      currentCity={currentCity}
      handleIsSelect={handleIsSelect}
      isDisable={isDisable}
      pais={pais}
      setIsFail={setIsFail}
      onNext={onNext}
    />
  );
};
