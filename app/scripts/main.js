console.log('\'Allo \'Allo!');
fetch("fortune.json").then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log("promise error: " + error))
