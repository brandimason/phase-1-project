function getRecipe() {
    let recipe = 'fish'
    const searchBar = document.querySelector('#searchbar')
    searchBar.addEventListener('submit', (e) => {
    const searchInput = document.querySelector('input[name="search"]')
    const searchText = searchInput.value
    e.preventDefault()
    recipe.textContent = searchInput.value
    })
}
getRecipe()

const ingredientList = document.getElementById('ingredientlist')
// console.log(ingredientList)
fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then(res => res.json())
    .then (data => init(data))

function init(recipeData) {
    recipeInfo = recipeData.meals[0]
    recipeName = (recipeInfo.strMeal)
    h1recipeName = document.querySelector('#recipeTitle')
    h1recipeName.textContent = recipeName

    recipeImage = (recipeInfo.strMealThumb)
    mainimg = document.querySelector('#mainimg')
    mainimg.src = recipeImage
//    console.log(recipeInfo["strIngredient1"])
    let ingredientsKeys = []
    function ingredientsLister(recipeInfo) {
        for (const key in recipeInfo) {
            
            if (key.startsWith("strIngredient") && recipeInfo[key] !== '') {
                ingredientsKeys.push(recipeInfo[key])
              }
            //   console.log(ingredientsKeys)
            }
        }
    
    ingredientsLister(recipeInfo)

    // console.log(ingredientsKeys)
    function listIngredients(ingredientsKeys) {
        for (let i = 0; i < ingredientsKeys.length; i++){
            const ingredientItem = ingredientsKeys[i]
            // console.log(ingredientItem)
            const ingredientBullet = document.createElement('li')
            ingredientBullet.textContent = ingredientItem
            ingredientList.appendChild(ingredientBullet)

            }
        }
        listIngredients(ingredientsKeys)
       
}