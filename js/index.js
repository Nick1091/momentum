import playList from './playList.js';
import trans from './translete.js';



const select = document.querySelector('#select'); 



// showTime
const time = document.querySelector('.time');
const dateCurrent = document.querySelector('.date');
let date = new Date();

//translatepage
let lang = select.options[select.selectedIndex].value;
function translateSite(){
  if (select.options[select.selectedIndex].value === 'en'){
    lang  = 'en';
  } else if (select.options[select.selectedIndex].value === 'ru'){
    lang  = 'ru';
  }
  showDate();
  getWeather();
  getLang();
  showTimeOFDay();
  getQuotes();
  CityValue();
  textHidden();
}
select.addEventListener('change', translateSite);

function getLang() {  
  lang = select.options[select.selectedIndex].value;
  let inputName = document.querySelector('.name')
  inputName.placeholder = `[${trans['placehold'][lang]}]`;
}
getLang()

//show date
const options = {weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' };

function showDate() {
  const currentDate = date.toLocaleDateString(`${lang}`, options);
  dateCurrent.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
}

// greeting
let greeting = document.querySelector('.greeting')
let currentHour = date.getHours();
let timeOfDay;

// inputName.placeholder = `${dat}${placeholder}${lang}`;

function showTimeOFDay(){
  getTimeOfDay()
  let goodDay  = `${trans["good"][lang]}`;
  if(lang === 'en'){
    goodDay  = `${trans["good"][lang]}`;
  } else {
    goodDay  = `${trans["good"][lang][timeOfDay]}`;
  }
  return greeting.textContent = `${goodDay} ${trans["currentTimeOfDay"][lang][timeOfDay]}`;
}

function getTimeOfDay(){
  
  let arr = ['night', 'morning', 'afternoon', 'evening']; 
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


//showtime and other
function showTime() {
  date = new Date();
  let currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showTimeOFDay();
}
showTime();


//random 1-20
function getRandomNum(){
  return Math.floor(Math.random() * 20 + 1);
};
let randomNum = getRandomNum();

function setBg(){
  timeOfDay = getTimeOfDay();
  let bgNum = String(randomNum);
  bgNum = bgNum.padStart(2, "0");
 
  let img = new Image();
  img.src =`https://raw.githubusercontent.com/nick1091/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
  img.onload = ()  =>{   
    document.body.style.backgroundImage = `url(${img.src})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  };
};
// setBg()

function getSlideNext(){
  if(randomNum === 20){
    randomNum = (randomNum % 20) + 1;
  } else randomNum++;
  setBg();
}

function getSlidePrev(){
  if(randomNum === 1){
    randomNum = 20;
  } else randomNum--;
  setBg();
}
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')



//weather
const weatherError = document.querySelector('.weather-error')
let city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');


city.value = `${trans["minsk"][lang]}`
function CityValue(){
  if(city.value === `${trans["minsk"]['en']}` || city.value === `${trans["minsk"]['ru']}`){
    city.value = `${trans["minsk"][lang]}`
  } else {
    city.value = city.value;
  }
}
let message;
// let errorCity;

async function getWeather() {
  message = `${trans["massage"][lang]}`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=c556d9cc09a9cb6b257758ae9ace940d&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  weatherError.textContent = `${trans["errorCity"][lang]} ${message} ${city.value}!` 
  // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  if (data.cod === 200){
  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `${trans['windSpeed'][lang]}: ${data.wind.speed.toFixed(0)} ${trans['speed'][lang]}`
  humidity.textContent = `${trans['humidity'][lang]}: ${data.main.humidity}%`
  weatherError.textContent = '';
  }
  else if(data.cod > 400 && data.cod < 600  ){
    // weatherError.textContent = `${trans["errorCity"][lang]} ${message} '${(city.value)}'!`
    temperature.textContent = "";
    weatherDescription.textContent = "";
    windSpeed.textContent = "";
    humidity.textContent = "";
    weatherIcon.classList.add('weather-icon-none');
  }
  else {
    // message = 'Nothing to geocode for';
    weatherError.textContent = `${trans["errorCity"][lang]} ${message} '${(city.value)}'!`
    city.value = "";
    weatherError.textContent = `${trans["errorCity"][lang]} ${message} '${(city.value)}'!`
    temperature.textContent = "";
    weatherDescription.textContent = "";
    windSpeed.textContent = "";
    humidity.textContent = "";
    weatherIcon.classList.add('weather-icon-none');
    city.placeholder = `[${trans['cityEnter'][lang]}]`;
  }
  
}
// getWeather()

city.addEventListener('change', function(){
  getWeather()
  // setLocalStorage()
})
document.addEventListener('DOMContentLoaded', getWeather);


// //localStorage
// function setLocalStorage() {
//   let name = document.querySelector('.name')
//   localStorage.setItem('name', name.value);
//   localStorage.setItem('city', city.value )
// }
// window.addEventListener('beforeunload', setLocalStorage)

// function getLocalStorage() {
//   let name = document.querySelector('.name')
//   if(localStorage.getItem('name')) {
//     name.value = localStorage.getItem('name');
//   }
//   if(localStorage.getItem('city')) {
//     city.value = localStorage.getItem('city');
//   }
//   getWeather()
// }
// window.addEventListener('load', getLocalStorage);



//quotes
let quote = document.querySelector('.quote');
let author = document.querySelector('.author');
let changeQuote = document.querySelector('.change-quote');

async function getQuotes() {  
  const quotes = './js/data/quotes.json';
  const dates = './js/data/data.json';
  let CurrentQuotes;
  if(lang == 'en'){
    CurrentQuotes = quotes;
  } else {
    CurrentQuotes = dates;
  }
  const res = await fetch(CurrentQuotes);
  const data = await res.json(); 
  let index = Math.floor(Math.random() * data.length);
  // console.log(data[index].text);
  quote.textContent = `"${data[index].text}."`;
  author.textContent = `${data[index].author}`;  
}
getQuotes();
  
changeQuote.addEventListener('click', getQuotes)



//audio
let playNum = 0;
let isPlay = false;
let listPlay = document.querySelector('.play-list')
let playButton = document.querySelector('.play');
let playPrev = document.querySelector('.play-prev');
let playNext = document.querySelector('.play-next');
let textAudio = document.querySelector('.text_under');

// let playItem = document.querySelector('.play_item');


playButton.addEventListener('click', togglePlay);
playPrev.addEventListener('click', PrevPlay);
playNext.addEventListener('click', NextPlay);



//add list title
playList.forEach(el => {
  let li = document.createElement('li');
  listPlay.append(li)  
  li.classList.add('play-item')
  li.textContent = playList[playNum].title
  let audio = document.createElement('audio');
  li.append(audio)
  audio.src = playList[playNum].src
  playNum++
});
// console.log(listPlay)


let audio = document.querySelector('audio');
let listLi = document.querySelectorAll('.play-item');
playNum = 0;

//add remove active title
function playNumberMinus(){
  if(playNum === 0 ){
    listLi[playNum].classList.remove('item-active')
    playNum = 3
  } else {
    listLi[playNum].classList.remove('item-active')
    playNum--
  }
  listLi[playNum].classList.add('item-active')
  textAudio.textContent = listLi[playNum].textContent;
}
function playNumberPlus(){
    if(playNum === 3){
      listLi[playNum].classList.remove('item-active')
      playNum = 0
    } else {
      listLi[playNum].classList.remove('item-active')
      playNum++;
    }
    listLi[playNum].classList.add('item-active')
    textAudio.textContent = listLi[playNum].textContent;
}

// prevplay
function PrevPlay(){
  isPlay = false;
  playNumberMinus();
  playButton.classList.add('pause');
  audio.src = playList[playNum].src
  toggleAudio();
}
//next play
function NextPlay(){
  isPlay = false;
  playButton.classList.add('pause');
  playNumberPlus();
  audio.src = playList[playNum].src 
  toggleAudio();
}
audio.addEventListener('ended',  function(){
  
  nextAudioPlay();
})
  //play next song
function nextAudioPlay(){
  NextPlay()
  
};

//change btn
function togglePlay(){
  toggleBtn();
  toggleAudio();
  listLi[playNum].classList.toggle('item-active')
  textAudio.textContent = listLi[playNum].textContent;
} 

//change small btn
for(let Nume = 0; Nume < listLi.length; Nume++){
  listLi[Nume].addEventListener('click', function(){
    if(listLi[Nume].classList.contains('item-active')){
      isPlay = true;
    } else {
      isPlay = false;
      audio.src = playList[Nume].src;
    }
    let i = 0;
    while(listLi.length > i){
      listLi[i].classList.remove('item-active'); 
      i++ 
    }
    if(!isPlay){
      listLi[Nume].classList.add('item-active');
      playButton.classList.remove('pause');
    }
    playNum = Nume;
    textAudio.textContent = listLi[playNum ].textContent;
    textAudio.textContent = listLi[playNum].textContent;
  toggleAudio()
  toggleBtn();
})
}


function toggleBtn() {
  playButton.classList.toggle('pause');
}

//play pause
function toggleAudio(){
  if(!isPlay){
    audio.play()
    isPlay = true;  
}
  else {
    audio.pause()
    isPlay = false;
  }
}


const range1  = document.querySelector('.range1');
const range2  = document.querySelector('.range2');
const currentTimeAudio = document.querySelector('.duration_timer');

range1.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, #fff 100%)`;
})
range2.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, #fff 100%)`;
})
window.addEventListener('load', function() {
  const value = range2.value;
  range2.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, #fff 100%)`;
})

//volume
const volumeBtn = document.querySelector('.volume_svg');
const volumeIcon = document.querySelector('.volume_icon');

function handleRange2Progress(){
    let volumeValue = range2.value;
    audio.volume = volumeValue / 100;
    if(audio.volume === 0){
      volumeIcon.classList.add('volume_off');
    } else{
      volumeIcon.classList.remove('volume_off');
    }    
}
function changeVolume(){
    if(audio.volume !== 0 ){
      volumeIcon.classList.add('volume_off');
      audio.volume = 0;
      range2.value = 0;
      range2.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${audio.volume * 100}%, #fff ${audio.volume * 100}%, #fff 100%)`;
    } else if (audio.volume === 0){
        volumeIcon.classList.remove('volume_off');
        audio.volume = 0.2;
        range2.value = 20;
        range2.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${audio.volume * 100}%, #fff ${audio.volume * 100}%, #fff 100%)`;
  }
}
volumeBtn.addEventListener('click',  changeVolume);
range2.addEventListener('input',  handleRange2Progress);

// range progress
function handleRange1Update(){
  audio.currentTime = range1.value / 100 * audio.duration;
};
function handleProgress(){
  const percent = (audio.currentTime / audio.duration) * 100;
  range1.value =`${percent}`;
  range1.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${percent}%, #fff ${percent}%, #fff 100%)`;
  p.innerHTML = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  if((!audio.currentTime) || (!audio.duration)){
    range1.value = 0;
    p.innerHTML = `${formatTime(0)} / ${formatTime(0)}`;
    range1.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${range1.value}%, #fff ${range1.value}%, #fff 100%)`;
  }
}   
range1.addEventListener('input',  handleRange1Update);
audio.addEventListener('timeupdate',  handleProgress);

//time progress
function formatTime(time){
  let minutes = (time / 60).toFixed(0) || 0;
  let seconds = (time % 60).toFixed(0) || 0;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
let p = document.createElement('p');
currentTimeAudio.append(p);
p.innerHTML = `${formatTime(0)} / ${formatTime(0)}`;



let tegImage = timeOfDay;
//images for other site
function getLinkToImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tegImage}&client_id=ES22Oak79L8BAErw89Ci37hdSFs9INzJzNwMgYc-ves;`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data.urls.regular);
      let img = new Image();
      img.src = data.urls.regular 
      img.onload = ()  =>{   
            document.body.style.backgroundImage = `url(${img.src})`; } 
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';       
      })
    }
  
let Un = document.querySelector('.unsplash') 
let imageTag = timeOfDay;
function getLinkToImageFl() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=38659cc7f1be7f071c92f0c55988c990&tags=${imageTag}&extras=url_l&format=json&nojsoncallback=1`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data.photos.photo[Math.floor(Math.random() * 40)].url_l);
      let img = new Image();
      img.src = data.photos.photo[Math.floor(Math.random() * 40)].url_l 
      if(data.cod === 404 || data.cod === undefined){
        getLinkToImageFl
      }
      img.onload = ()  =>{   
            document.body.style.backgroundImage = `url(${img.src})`; } 
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            
      })
    }
    
  let Fl = document.querySelector('.flick')   
  let gHub = document.querySelector('.GHub')

let radios = document.querySelectorAll('input[type=radio][name="bgImage"]');
let lab1 = document.querySelector(".g_h");
let lab2 = document.querySelector(".unsplash1");
let lab3 = document.querySelector(".flick2" );

function changeHandler0 (){
  slidePrev.removeEventListener('click', getLinkToImage)
  slideNext.removeEventListener('click', getLinkToImage)
  slidePrev.removeEventListener('click', getLinkToImageFl)
  slideNext.removeEventListener('click', getLinkToImageFl)
  slidePrev.addEventListener('click', getSlidePrev)
  slideNext.addEventListener('click', getSlideNext)
  setBg()
}

function changeHandler1 (){
  slidePrev.removeEventListener('click', getSlidePrev)
  slideNext.removeEventListener('click', getSlideNext)
  slidePrev.removeEventListener('click', getLinkToImageFl)
  slideNext.removeEventListener('click', getLinkToImageFl)  
  slidePrev.addEventListener('click', getLinkToImage)
  slideNext.addEventListener('click', getLinkToImage)
  getLinkToImage() 
}

function changeHandler2 (){
  slidePrev.removeEventListener('click', getSlidePrev)
  slideNext.removeEventListener('click', getSlideNext)
  slidePrev.removeEventListener('click', getLinkToImage)
  slideNext.removeEventListener('click', getLinkToImage)
  slidePrev.addEventListener('click', getLinkToImageFl)
  slideNext.addEventListener('click', getLinkToImageFl)
  
  getLinkToImageFl()
}

radios[0].addEventListener('change', changeHandler );
radios[1].addEventListener('change', changeHandler );
radios[2].addEventListener('change', changeHandler );



function changeHandler() {
if(radios[0].checked){
  changeHandler0 ()
  lab2.style.color = "#fff"
  lab3.style.color = "#fff"
  lab1.style.color = "#d6ff9f"
} else if(radios[1].checked){
  changeHandler1 () 
  lab1.style.color = "#fff";
  lab3.style.color = "#fff"
  lab2.style.color = "#d6ff9f"
} else if (radios[2].checked){
  changeHandler2 ()
  lab1.style.color = "#fff"
  lab2.style.color = "#fff"
  lab3.style.color = "#d6ff9f"
}
}
window.addEventListener('load', changeHandler)



// settings
let inputUnsplashSource = document.querySelector(".unspl");
let inputFlickrSource = document.querySelector(".flic");

inputUnsplashSource.placeholder = tegImage;
inputFlickrSource.placeholder = imageTag;


function changeTagUns(){
  tegImage = inputUnsplashSource.value;
  radios[1].checked = true;
  changeHandler()
}
inputUnsplashSource.addEventListener('change', changeTagUns)

function changeTagFl(){
  imageTag = inputFlickrSource.value;
  radios[2].checked = true;
  changeHandler()
}
inputFlickrSource.addEventListener('change', changeTagFl)


// transition
// opacity или visibility.
// let tegImage = timeOfDay;
// let imageTag = timeOfDay;

const state = {
  language: lang.textContent,
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

let timeHidden = document.querySelector('.time_hidden');


let dataHidden = document.querySelector('.data_hidden')

let greetingHidden = document.querySelector('.greeting_hidden')
let greeting1 = document.querySelector('.greeting-container')

let quoteHidden = document.querySelector('.quote_hidden')
let quoteBlock = document.querySelector('.quote_block')

let weathHidden = document.querySelector('.weather_hidden')
let WeatherBlock = document.querySelector('.weather')

let audioHidden = document.querySelector('.audio_hidden')
let playerHidden = document.querySelector('.player')

function textHidden(){
timeHidden.textContent = `${trans["timeHidden"][lang]}`;
dataHidden.textContent = `${trans["dataHidden"][lang]}`;
greetingHidden.textContent = `${trans["greetingHidden"][lang]}`;
quoteHidden.textContent = `${trans["quoteHidden"][lang]}`;
weathHidden.textContent = `${trans["weathHidden"][lang]}`;
audioHidden.textContent = `${trans["audioHidden"][lang]}`;
}




let isAudio = false;

function HiddenAudio (){
  if (!isAudio) {
    playerHidden.style.transition = '0.2s';
    playerHidden.style.opacity = '0';
    playerHidden.style.visibility = "hidden";
    isAudio = true;
} else{
  playerHidden.style.opacity = '1';
  playerHidden.style.visibility = "visible";
  isAudio = false;
}
}
audioHidden.addEventListener('click', HiddenAudio)



let isTime = false;
function HiddenTime (){
  if (!isTime) {
    time.style.transition = "0.2s"
    time.style.opacity = '0';
    time.style.visibility = "hidden";
    isTime = true;
} else{
  time.style.opacity = '1';
  time.style.visibility = "visible";
  isTime = false;
}
}
timeHidden.addEventListener('click', HiddenTime)

let isDate = false;
function HiddenDate (){
  if (!isDate) {
    dateCurrent.style.transition = "0.2s"
    dateCurrent.style.opacity = '0';
    dateCurrent.style.visibility = "hidden";
    isDate = true;
} else{
  dateCurrent.style.opacity = '1';
  dateCurrent.style.visibility = "visible";
  isDate = false;
}
}
dataHidden.addEventListener('click', HiddenDate)

let isGreeting = false;
function HiddenGreeting (){
  if (!isGreeting) {
    greeting1.style.transition = "0.2s"
    greeting1.style.opacity = '0';
    greeting1.style.visibility = "hidden";
    isGreeting = true;
} else{
  greeting1.style.opacity = '1';
  greeting1.style.visibility = "visible";
  isGreeting = false;
}
}
greetingHidden.addEventListener('click', HiddenGreeting)

let isQuote = false;
function HiddenQuote(){
  if (!isQuote) {
    quoteBlock.style.transition = "0.2s"
    quoteBlock.style.opacity = '0';
    quoteBlock.style.visibility = "hidden";
    isQuote = true;
} else{
  quoteBlock.style.opacity = '1';
  quoteBlock.style.visibility = "visible";
  isQuote = false;
}
}
quoteHidden.addEventListener('click', HiddenQuote)

let isWeather = false;

function weatherHidden(){
  if (!isWeather) {
    WeatherBlock.style.transition = "0.2s"
    WeatherBlock.style.opacity = '0';
    WeatherBlock.style.visibility = "hidden";
    isWeather = true;
} else{
  WeatherBlock.style.opacity = '1';
  WeatherBlock.style.visibility = "visible";
  isWeather = false;
}
}
weathHidden.addEventListener('click', weatherHidden)




// function setLocalStorage() {
  
//   localStorage.setItem('lang', lang.value);
//   // localStorage.setItem('city', city.value )
// }
// window.addEventListener('beforeunload', setLocalStorage)

// function getLocalStorage() {
//   // let name = document.querySelector('.name')
//   if(localStorage.getItem('lang')) {
//     lang.value = localStorage.getItem('lang');
//   }
//   translateSite()
// }
  // if(localStorage.getItem('city')) {
  //   city.value = localStorage.getItem('city');
  // }
  // getWeather()

// window.addEventListener('load', getLocalStorage);
//localStorage
// let lang = select.options[select.selectedIndex].value
function setLocalStorage() {
  
  let name = document.querySelector('.name')
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value );
  localStorage.setItem('lang', lang);
  localStorage.setItem('isWeather', isWeather);
  localStorage.setItem('isQuote', isQuote);
  localStorage.setItem('isGreeting', isGreeting);
  localStorage.setItem('isDate', isDate);
  localStorage.setItem('isTime', isTime );
  localStorage.setItem('isAudio', isAudio);
  
  
  
  
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  let name = document.querySelector('.name')
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  getWeather()
  let lang = select.options[select.selectedIndex].value
  if(localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    select.value = lang; 
  }  
  translateSite()
  if(localStorage.getItem('isWeather')){
    isWeather = localStorage.getItem('isWeather');
    console.log(isWeather)
  
    // weatherHidden()
  }
  if(localStorage.getItem('isQuote')){}
  if(localStorage.getItem('isGreeting')){}
  if(localStorage.getItem('isDate')){}
  if(localStorage.getItem('isTime')){}
  if(localStorage.getItem('isAudio')){}
}
window.addEventListener('load', getLocalStorage);


let isToDo = false;
let toDoList = document.querySelector('.to_do_list')
let toDo = document.querySelector('.to_do');
let toDoBtn = document.querySelector('.btn_todo');
toDo.addEventListener('click', () =>{
  if (!isToDo){
  toDoList.classList.add('to_do_bg')
  isToDo = true;
  } else {
    toDoList.classList.remove('to_do_bg');
    isToDo = false;
  }
})

toDoBtn.addEventListener('click', () => {
  toDoBtn.classList.add('btn_to');
  let newInput = document.createElement('input')
  newInput.innerHTML = `type="text"  id="input_to_do" placeholder = "New Todo"`;
  
  toDoList.prepend(newInput);
  // toDoList.innerHTML = `<input type="checkbox" name="checkbox" id="checbox"></input><label for = checbox></label>`;
  // toDoList.prepend(newInput);

newInput.addEventListener('change', () => {
  let newChecbox = document.createElement('input');
  newChecbox.innerHTML = `type="checkbox" name="checkbox" id="checbox"`
  toDoList.prepend(newChecbox);

})
})