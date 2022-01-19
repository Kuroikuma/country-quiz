export const getContries = () => {
  return fetch("https://restcountries.com/v3.1/all")
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};
export const getFlagCity = (pais) => {
  console.log(pais);
  return fetch(`https://restcountries.com/v3.1/name/${pais}`)
    .then((data) => data.json())
    .then((data) => {
      console.log(data[0].flags.svg);
      return data[0].flags.svg;
    })
    .catch((error) => console.log(error));
};
