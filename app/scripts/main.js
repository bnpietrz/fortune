var dailyFortune;

const fortuneButton = document.querySelector('button.fortune')
const output        = document.querySelector('p.output')

fortuneButton.addEventListener('click', () => showFortune(dailyFortune))

function getRandomFortune(fortunes) {
  const randomValue = fortunes[Math.floor(Math.random() * fortunes.length)];
  return randomValue
}

function showFortune(fortune) {
  output.textContent = fortune
}

function onFortunesReady(data) {
  fortuneButton.removeAttribute('disabled')
  dailyFortune = getRandomFortune(data)
}

fetch("fortune.json").then(response => response.json())
  .then(data => onFortunesReady(data))
  .catch(error => console.log("promise error: " + error))
