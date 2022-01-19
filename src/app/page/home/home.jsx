import Spinner from "../../../assets/Spinner.gif";
import { QuizCard } from "../../components/quiz-card/quiz-card";
import logoHome from "../../../assets/undraw_adventure_4hum1.svg";
import "./home.css";
import { Layout } from "../../components/layout/layout";

export const HomeView = (props) => {
  const {
    isLoading,
    isSelect,
    currentPais,
    currentCity,
    handleIsSelect,
    pais,
    isDisable,
    setIsFail,
    onNext,
    currentBandera,
    quizType,
  } = props;
  return (
    <>
      <Layout />
      {isLoading ? (
        <div className="spinner">
          <img src={Spinner} alt="Spinner" />
        </div>
      ) : (
        <div className="HomeContainer">
          <div className="HomeContainer__title">
            <h1>Country quiz</h1>
          </div>
          <div
            className={
              isSelect
                ? `HomeContainer__listCard increase quizType${quizType}`
                : `HomeContainer__listCard quizType${quizType}`
            }
          >
            {/* order, text, select, isSelect, onSelectQuiz */}
            <div
              className={
                isSelect
                  ? `HomeContainer__listCard__img increaseIMG quizType${quizType}`
                  : `HomeContainer__listCard__img quizType${quizType}`
              }
            >
              <img src={logoHome} alt="imagenDeLaLista" />
            </div>
            {quizType === 1 ? (
              <div className="HomeContainer__listCard__Flag">
                <img src={`${currentBandera}`} alt="currentBandera" />
              </div>
            ) : null}
            <div className="HomeContainer__listCard__tittle">
              {quizType === 1 ? (
                <p>Which country does this flag belong to? </p>
              ) : (
                <p>{currentCity} is the capital of</p>
              )}
            </div>
            {pais &&
              pais.map((item, index) => (
                <QuizCard
                  key={index}
                  order={index}
                  text={item}
                  select={currentPais}
                  isSelect={isSelect}
                  onSelectQuiz={handleIsSelect}
                  isDisable={isDisable}
                  setIsFail={setIsFail}
                />
              ))}

            {isSelect ? (
              <div className="HomeContainer__button">
                <button onClick={onNext}>Next</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
