
// let recipeSearch = 'taco'
fetch(`http://localhost:3000/recipe`)
.then(res =>res.json())
.then(data => console.log(data))
.catch(e => console.log(e))

// search for receipes
// show the recipe ingredients 
// show the recipe instructions

// show your favorite reipes at the bottom
// add your own recipes (using a form)

