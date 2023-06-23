let url = 'https://api-ninjas.com/api/recipe'
let id = 'taco'
fetch(`${url}/${id}`)
    .then(res =>res.json())
    .then(data => console.log(data))