
let recipeSearch = 'taco'
fetch(`https://api-ninjas.com/api/recipe?query=${recipeSearch}`, {
    headers: {
        'X-Api-Key': apiKey
    },
    method: 'GET',
})
    .then(res =>res.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error: ', error))


