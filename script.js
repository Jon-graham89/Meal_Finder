const form = document.getElementById('submit');
const resultHeading = document.getElementById('result-heading');
const singleMeal = document.getElementById('single-meal');
const randomBtn = document.getElementById('random');
const ingredients = document.getElementById('ingredient-list')

const fetchAPI = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            mealData = data.meals;
        });
}

fetchAPI();


// display images on submit for input
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value === '') {
        alert('Please Enter an Ingredient or Meal')
    } else {
        singleMeal.innerHTML = '';
        resultHeading.innerHTML = '';
        ingredients.innerHTML = '';


        filterMealsOnSearch();
        displayMealImages();
        imageOnClick_DisplayInformation();

        search.value = '';
    }

});


const filterMealsOnSearch = () => {
    searchedMeals = mealData.filter(x => x.strInstructions.includes(`${search.value}`) || x.strMeal.includes(`${search.value}`));
};

const displayMealImages = () => {
    searchedMeals.forEach(item => {
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
            <div class="image-container">
            <img src="${item.strMealThumb}" alt="${item.strMeal}">
            <div class="middle">
                <div class="text">${item.strMeal}</div>
            </div>
            </div>
            `;
        resultHeading.appendChild(mealDiv);
    })
};

const imageOnClick_DisplayInformation = () => {
    const image = document.querySelectorAll('img');
    image.forEach(img => img.addEventListener('click', (e) => {

        for (i = 0; i < searchedMeals.length; i++) {
            if (searchedMeals[i].strMeal === e.target.alt) {
                resultHeading.innerHTML = '';
                const meal3 = document.createElement('div');
                meal3.innerHTML = `
                <h4>${searchedMeals[i].strMeal}</h4>
                <img src="${searchedMeals[i].strMealThumb}" alt="${searchedMeals[i].strMeal}">
                <p>${searchedMeals[i].strInstructions}</p>
            `;
                singleMeal.appendChild(meal3);
                ingredientList();
                displayIngredientsList();
            }
        }
        console.log(e.target.alt)
    }))
};


randomBtn.addEventListener('click', () => {
    randomMeal = mealData[Math.round(Math.random() * mealData.length)];
    // meals.innerHTML = '';
    singleMeal.innerHTML = '';
    resultHeading.innerHTML = '';
    ingredients.innerHTML = '';
    const meal = document.createElement('div')
    meal.innerHTML = `  
                        <h4>${randomMeal.strMeal}</h4>
                        <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}">
                        <p>${randomMeal.strInstructions}</p>   
                        `;

    singleMeal.appendChild(meal);
    randomMealIngredientList();
    displayRandomMeal_IngredientsList();
});


const displayIngredientsList = () => {
    ingredientsList.forEach(i => {
        const span = document.createElement('span');
        span.innerHTML = `${i}</br>`;
        ingredients.appendChild(span);
    })
};

const displayRandomMeal_IngredientsList = () => {
    randomMealIngredients.forEach(i => {
        const span = document.createElement('span');
        span.innerHTML = `${i}</br>`;
        ingredients.appendChild(span);
    })
};


