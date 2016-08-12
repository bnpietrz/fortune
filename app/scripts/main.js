var dailyFortune;

const svgContainer  = document.querySelector('.svg-container')


svgContainer.addEventListener('click', () => clickHandler())

function getRandomFortune(fortunes) {
  return fortunes[Math.floor(Math.random() * fortunes.length)]
}

function showFortune(fortune) {
  svgContainer.querySelector('#paper-text tspan').textContent = fortune
}

function openCookie() {
  const svg = svgContainer.querySelector('#cookie')
  if (svg.classList) {
    svg.classList.add('open');
  } else {
    svg.className += ' ' + 'open';
  }
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
  if (svgContainer.hasAttribute('data-disabled')) {
    return
  }
  if (!hasVisitedToday()) {
    // set localStorage
    localStorage.setItem('fortune', dailyFortune)
    localStorage.setItem('date', getDate())
  }
  // use fortune
  showFortune(dailyFortune)
  openCookie()
}

function onFortunesReady(data) {
  svgContainer.removeAttribute('data-disabled')
  dailyFortune = getRandomFortune(data)
}

function getFortunes() {
  fetch('fortune.json').then(response => response.json())
    .then(data => onFortunesReady(data))
    .catch(error => console.log('promise error: ' + error))
}

// console.log("fortune from local storage: " + localStorage.getItem('fortune'))
// console.log("date from local storage: " + hasVisitedToday())

if (hasVisitedToday() && localStorage.getItem('fortune')) {
  svgContainer.removeAttribute('data-disabled')
  dailyFortune = localStorage.getItem('fortune')
} else {
  getFortunes()
}

// get SVG illustration
fetch('images/cookie.svg').then(response => response.text())
  .then(data => {
    svgContainer.innerHTML = data
  })
  .catch(error => console.log('promise error: ' + error))
