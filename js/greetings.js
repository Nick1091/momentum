// const dates = './js/data/data.json';
//   const quotes = './js/data/quotes.json';
//   const res = await fetch(quotes);        цитаты


let lang = 'ru';

const currentDate = date.toLocaleDateString('en-RU', options); время



input type="text" class="name" placeholder="[Enter name]
inputName.placeholder='[Enter name]';
let enterName = 

function showTimeOFDay(){
  getTimeOfDay()
  let good = 'Good'
  return greeting.textContent = `${good} ${timeOfDay}`
}

function getTimeOfDay(){
  let arr = [night, morning, afternoon, evening]; 
  if (currentHour <= 5) {
    timeOfDay = arr[0];
  } else if (currentHour <= 11) {
    timeOfDay = arr[1];
  } else if (currentHour <= 17) {
    timeOfDay = arr[2];
  } else {
    timeOfDay = arr[3];
  } 
  return timeOfDay
}

message = 'City not found for';
weatherError.textContent = `Error! ${message} ${city.value}!` 
windSpeed.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} м/c`
humidity.textContent = `Humidity: ${data.main.humidity}%`
message = 'Nothing to geocode for';
weatherError.textContent = `Error! ${message} '${(city.value)}'!`