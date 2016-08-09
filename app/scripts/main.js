console.log('\'Allo \'Allo!');

/* Selecting a random fortune */
function getRandomFortune(fortunes) {
  var randomValue = fortunes[Math.floor(Math.random() * fortunes.length)];
  console.log(randomValue)
}


fetch("fortune.json").then(response => response.json())
  .then(data => getRandomFortune(data))
  .catch(error => console.log("promise error: " + error))
