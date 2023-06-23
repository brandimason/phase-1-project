
let recipeSearch = 'taco'
fetch(`https://api-ninjas.com/api/recipe?query=${recipeSearch}&key=${keyString}`)
    .then(res =>res.json())
    .then(data => console.log(data))


