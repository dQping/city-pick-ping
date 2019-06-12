import axios from "axios";
import {
  isEnglishString,
  isChineseString,
  saveLocalStorage,
  getLocalStorage
} from "../utils";

const hotCityLabels = ["北京", "上海", "深圳", "广州", "武汉", "成都"];
const LASTEST_CITY = "LASTEST_CITY";
const CITY_API = "/waether/upload/weather/json/NationalUrbanData.min.json";

async function getAllCities() {
  const result = await axios.get(CITY_API);
  if (result.status === 200) {
    return formatCites(result.data);
  }
}
function initialAllCity() {
  const city = {};
  for (let i = 0; i < 26; i++) {
    city[String.fromCharCode(65 + i)] = [];
  }
  return city;
}
function filterCity(city) {
  const validateLetters = [];
  const allCity = {};
  Object.keys(city).forEach(letter => {
    const cityCollectoin = city[letter];
    if (cityCollectoin.length > 0) {
      validateLetters.push(letter);
      allCity[letter] = city[letter];
    }
  });

  return {
    validateLetters,
    allCity
  };
}
function formatCites(data) {
  const beforeFilterAllCity = initialAllCity();
  const hotCity = [];
  const city = data.city;

  Object.keys(city).forEach(code => {
    const cityCollection = city[code] || [];
    cityCollection.forEach(cityItem => {
      const firstLetter = cityItem.en && cityItem.en[0].toUpperCase();
      if (cityItem.en === "hongkong") {
        cityItem.en = "xianggang";
        beforeFilterAllCity["X"].push(cityItem);
      } else {
        beforeFilterAllCity[firstLetter].push(cityItem);
      }

      if (hotCityLabels.includes(cityItem.city)) {
        hotCity.push(cityItem);
      }
    });
  });
  const afterFilterAllCity = filterCity(beforeFilterAllCity);

  return {
    hotCity,
    afterFilterAllCity
  };
}
function getLocalStorageCity(key) {
  const cityInfo = getLocalStorage(key);
  return cityInfo ? cityInfo.split(":") : [];
}

function saveLocalStorageCity(key, city) {
  const lastestCity = getLocalStorageCity(key);

  if (!lastestCity.includes(city)) {
    if (lastestCity.length >= 2) {
      lastestCity.splice(0, 1);
    }
    lastestCity.push(city);
    saveLocalStorage(key, lastestCity.join(":"));
  }

  return lastestCity;
}
export {
  getAllCities,
  LASTEST_CITY,
  saveLocalStorageCity,
  getLocalStorageCity
};
