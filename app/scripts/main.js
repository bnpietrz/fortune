console.log('\'Allo \'Allo!');

const output        = document.querySelector('p.output')

/* Selecting a random fortune */
function getRandomFortune(fortunes) {
  const randomValue = fortunes[Math.floor(Math.random() * fortunes.length)];
  return randomValue
}

function onFortunesReady(data) {
  const randomFortune = getRandomFortune(data)
  output.textContent = randomFortune
}


fetch("fortune.json").then(response => response.json())
  .then(data => onFortunesReady(data))
  .catch(error => console.log("promise error: " + error))
