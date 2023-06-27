const ingredientList = document.getElementById('ingredientlist')
const instructions = document.getElementById('instructions')
// let recipeInfo
// let


// let recipe = 'pie'
const searchBar = document.querySelector('#searchbar')
const submitButton = searchBar.querySelector('.button')
let searchInfo = document.querySelector('#search-info')
    submitButton.addEventListener('mouseover', () =>{
        submitButton.style.backgroundColor = "yellow"
        
    })
    submitButton.addEventListener('mouseleave', () =>{
        submitButton.style.backgroundColor = ""
        
    })
    searchBar.addEventListener('submit', (e) => {
        e.preventDefault()
        recipe = searchInfo.value
        console.log(recipe)
        function removeOld(element, element2) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
            }
        while (element2.firstChild) {
            element2.removeChild(element2.firstChild)
            }
    
        }
        removeOld(ingredientList, instructions)
        fetchFunction(recipe)
    })

// search for receipes
// show the recipe ingredients 
// show the recipe instructions

function fetchFunction(recipe) {
//console.log(ingredientList)
fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then(res => res.json())
    .then (data => init(data))
}

function init(recipeData) {
    let favorited = false //defines the default state of the favorite button
    recipeInfo = recipeData.meals[0]
    recipeName = (recipeInfo.strMeal)
    h1recipeName = document.querySelector('#recipeTitle')
    h1recipeName.textContent = recipeName

    recipeImage = (recipeInfo.strMealThumb)
    mainimg = document.querySelector('#mainimg')
    mainimg.src = recipeImage
    mainimg.addEventListener('mouseover', () => {
        mainimg.with= "400"

    })
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
    function listInstructions (recipeInfo){
      const pInstructions = document.createElement('p')
        pInstructions.textContent = recipeInfo.strInstructions
        instructions.appendChild(pInstructions)
        console.log(instructions)

    }
   console.log (listInstructions(recipeInfo))

    
        const favoriteButton = document.querySelector('#favorite')
        favoriteButton.addEventListener('click', () => {
            favorited = !favorited
            favorited === true ? favoriteButton.textContent = "❤️" : favoriteButton.textContent = "♡"
            addToFavorites()
            //**extra: append data to the favorites
        })
    // function addToFavorites() {

    // }

    }
       