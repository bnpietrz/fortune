var dailyFortune;

const fortuneButton = document.querySelector('button.fortune')
const output        = document.querySelector('p.output')

fortuneButton.addEventListener('click', () => clickHandler())

function getRandomFortune(fortunes) {
  return fortunes[Math.floor(Math.random() * fortunes.length)]
}

function showFortune(fortune) {
  output.textContent = fortune
}

function getDate() {
  // Date.now() gets number of ms since Jan 1 1970, so
  //              sub secs \  ms since 70  \   ms/sec  \  sec/day
  const dayInt = Math.floor(  Date.now()   /   1000    /   86400  )
  return dayInt
}

function hasVisitedToday() {
  // localStorage uses strings for values, so parseInt() before comparison
  return ( parseInt(localStorage.getItem('date')) === getDate() )
}

function clickHandler() {
  if (!hasVisitedToday()) {
    // set cookie
    localStorage.setItem('fortune', dailyFortune)
    localStorage.setItem('date', getDate())
  }
  // use fortune
  showFortune(dailyFortune)
}

function onFortunesReady(data) {
  fortuneButton.removeAttribute('disabled')
  dailyFortune = getRandomFortune(data)
}

function getFortunes() {
  fetch("fortune.json").then(response => response.json())
    .then(data => onFortunesReady(data))
    .catch(error => console.log("promise error: " + error))
}

// console.log("fortune from local storage: " + localStorage.getItem('fortune'))
// console.log("date from local storage: " + hasVisitedToday())

if (hasVisitedToday() && localStorage.getItem('fortune')) {
  console.log('use whats in local storage')
  fortuneButton.removeAttribute('disabled')
  dailyFortune = localStorage.getItem('fortune')
} else {
  console.log('get new fortune')
  getFortunes()
}
