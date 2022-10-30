const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

const citiesData = fetch(endpoint)
  .then((respo) => respo.json())
  .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // here we need to figure out if the city and state matches what we searched for
    const regex = new RegExp(wordToMatch, "gi");

    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displaySearchedCity() {
  const catchAllArr = findMatches(this.value, cities);
  console.log(catchAllArr);

  let html = catchAllArr
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      // console.log(place);
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return ` <li><spna>${cityName}, ${stateName}</spna><span class="population">${place.population}</span></li>`;
    })
    .join("");
  console.log(html);
  suggestions.innerHTML = html;
}

const input = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

input.addEventListener("change", displaySearchedCity);
input.addEventListener("keyup", displaySearchedCity);
