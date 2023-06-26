const ingredientList = document.getElementById('ingredientlist')

let recipe = 'pie'
const searchBar = document.querySelector('#searchbar')
let searchInfo = document.querySelector('#search-info')
    searchBar.addEventListener('submit', (e) => {
        e.preventDefault()
    recipe = searchInfo.value
    console.log(recipe)
    function removeOld(element) {
        while (element.firstChild) {
            console.log(element.firstChild)
            element.removeChild(element.firstChild)
        }
    }
    removeOld(ingredientList)
    fetchFunction(recipe)
    })


function fetchFunction(recipe) {
//console.log(ingredientList)
fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then(res => res.json())
    .then (data => init(data))
}

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