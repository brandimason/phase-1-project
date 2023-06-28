let recipeName;
let recipeImage;
const instructions = document.querySelector("#instructions");
const favoriteButton = document.querySelector('#favorite');
const searchBar = document.querySelector('#searchbar');
const submitButton = searchBar.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const ingredientList = document.querySelector ('#ingredient_list');
const ingredientHeader = document.querySelector('#ingredient_header');
const instructionHeader = document.querySelector('#instructions_header');

    
    favoriteButton.addEventListener('click', () =>{
    addToFavorites()
    })
    //not sure if this is working or not

    submitButton.addEventListener('click', () =>{
        submitButton.style.backgroundColor = "blue"
    })
    //when the search button is clicked, it turns blue

submitButton.addEventListener('mouseover', () =>{
        submitButton.style.backgroundColor = "yellow"
})

submitButton.addEventListener('mouseleave', () =>{
        submitButton.style.backgroundColor = ""
})
 

searchBar.addEventListener('submit', (e) => {
        e.preventDefault()
    recipe = searchInput.value
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


//functions
function fetchFunction(recipe) {
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`)
        .then(res => res.json())
        .then (data => preprocessData(data))
}


function fetchRandomRecipe(){
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(allRandomRecipes => init(allRandomRecipes.meals[0]))

}


function preprocessData(recipeData){
    const substitution = document.querySelector('#substitution');
    ingredientHeader.textContent = "Ingredients"
    instructionHeader.textContent = "Instructions"
    if (recipeData.meals === null) {
        substitution.textContent = "This item is not available, here is a random recipe for you!";
    
        fetchRandomRecipe();
    } else {
        substitution.textContent = "";
        displayFirstTenRecipeNames(recipeData);
        init(recipeData.meals[0]);
    }
}

function displayFirstTenRecipeNames(recipeData){
    removeAllChildNodes(document.querySelector("#myList"));
    for (i = 0; i < Math.min(recipeData.meals.length, 10); i++) {
        (recipeData.meals[i]);
        const node = document.createElement("li");
        node.setAttribute('idx', i.toString());
        node.addEventListener('click', ()=> {
            (node.getAttribute("idx"));
            init(recipeData.meals[parseInt(node.getAttribute("idx"))]);
            favoriteButton.textContent = "♡"
        favorited = false
        })
        const textnode = document.createTextNode(recipeData.meals[i].strMeal);
        node.appendChild(textnode);
        document.getElementById("myList").appendChild(node);
        
    }

}
 


function init(recipeInfo) {
     //defines the default state of the favorite button   
    recipeName = recipeInfo.strMeal
    recipeCategory = recipeInfo.strCategory
    const h1recipeName = document.querySelector('#recipeTitle')
    h1recipeName.textContent = recipeName

    recipeImage = (recipeInfo.strMealThumb)
    mainimg = document.querySelector('#mainimg')
    mainimg.src = recipeImage
    mainimg.addEventListener('mouseover', () => {
        mainimg.style.width= "400"
        fetchCategory()
        matchCategory(recipeCategory)
    
    })
    function fetchCategory() {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(allCategories => allCategories.categories.forEach(categoryList => matchCategory(categoryList)))
                
        }
        function matchCategory(categoryList, recipeCategory){
            // allCategories.categories.forEach(category => console.log(category))
            console.log(recipeCategory)
            console.log(categoryList)
        //  const match = category.find(categoryList.strCategory => category === recipeCategory)
         categoryDescriptionValue = match.strCategory
         categoryDescription = document.createElement('p')
         categoryDescripton.textContent = categoryDescriptionValue
         categoryDiv = document.querySelector('#descripton')
         categoryDiv.appendChild(categoryDescription)
        
        }
    
    
    
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
        removeAllChildNodes(ingredientList);
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
        removeAllChildNodes(document.querySelector("#instructions"))
        const pInstructions = document.createElement('p')
        pInstructions.textContent = recipeInfo.strInstructions
        instructions.appendChild(pInstructions)
        // console.log(instructions)

    }
        listInstructions(recipeInfo)
}
//    console.log (listInstructions(recipeInfo))

    
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
    

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
