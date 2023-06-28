let recipeName
let recipeImage
let instructions = document.querySelector("#instructions") 
const ingredientList = document.getElementById('ingredientlist')
const favoriteButton = document.querySelector('#favorite')
const searchBar = document.querySelector('#searchbar')
const submitButton = searchBar.querySelector('#search-btn')
let searchInfo = document.querySelector('#search-info')




    favoriteButton.addEventListener('click', () => {
        addToFavorites()})


    submitButton.addEventListener('click', () =>{
    submitButton.style.backgroundColor = "blue"
    })


    submitButton.addEventListener('mouseover', () =>{
        submitButton.style.backgroundColor = "yellow"
        
    })
    submitButton.addEventListener('mouseleave', () =>{
        submitButton.style.backgroundColor = ""
        
    })
    searchBar.addEventListener('submit', (e) => {
        e.preventDefault()
    recipe = searchInfo.value
    // console.log(recipe)
    function removeOld(element, element2) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
            }
        while (element2.firstChild) {
            element2.removeChild(element2.firstChild)
            }
    
        }
        favoriteButton.textContent = "♡"
        favorited = false
        removeOld(ingredientList, instructions)
        fetchFunction(recipe)
        

    })


function fetchFunction(recipe) {
//console.log(ingredientList)
fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
    .then(res => res.json())
    .then (data => init(data))
}

function init(recipeData) {
     //defines the default state of the favorite button
    recipeInfo = recipeData.meals[0]
    recipeName = (recipeInfo.strMeal)
    const h1recipeName = document.querySelector('#recipeTitle')
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
        // console.log(instructions)

    }
        listInstructions(recipeInfo)
//    console.log (listInstructions(recipeInfo))

    
        

       
            
        }
        function addToFavorites() {
            
            favorited = !favorited
            if (favorited === true) {
                favoriteButton.textContent = "❤️"
            }
            let favoriteSection = document.querySelector('.favorites_bar')
            let favoriteTitle = document.createElement('p')
            favoriteTitle.textContent = recipeName
            // favoriteSection.appendChild(favoriteTitle)
            let favoriteImage = document.createElement('img')
            favoriteImage.style.width = "150px";
            favoriteImage.src = recipeImage
            favoriteSection.append(favoriteImage, favoriteTitle)
    
            
        }
    

       