import { API_KEY } from "./config.js";
const recipeTitles = document.getElementsByTagName("h2");
const recipeList = document.getElementById("recipe-list");

function changePageElements(recipes) {
  recipeList.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeItemEl = document.createElement("li");
    recipeItemEl.classList.add("recipe-item");

    const recipeImageEl = document.createElement("img");
    recipeImageEl.src = recipe.image;
    recipeImageEl.alt = recipe.title;

    const recipeTitleEl = document.createElement("h2");
    recipeTitleEl.innerText = recipe.title;

    const recipeIngredientsEl = document.createElement("p");
    recipeIngredientsEl.innerHTML = `
    <strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    const recipeItemLink = document.createElement("a");
    recipeItemLink.href = recipe.sourceUrl;
    recipeItemLink.innerText = "View Recipe";

    recipeItemEl.appendChild(recipeImageEl);
    recipeItemEl.appendChild(recipeTitleEl);
    recipeItemEl.appendChild(recipeIngredientsEl);
    recipeItemEl.appendChild(recipeItemLink);

    recipeList.appendChild(recipeItemEl);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  changePageElements(recipes);
  console.log(recipes);
  console.log(recipeTitles);
}

init();
