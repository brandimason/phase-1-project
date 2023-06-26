
let recipe = 'bread'
fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then(res => res.json())
    .then (data => init(data))

function init(recipeData) {
    recipeName = (recipeData.meals[0].strMeal)

}



