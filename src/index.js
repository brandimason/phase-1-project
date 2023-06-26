
// let recipeSearch = 'taco'
fetch(`http://localhost:3000/recipe`)
.then(res =>res.json())
.then(data => console.log(data))
.catch(e => console.log(e))



