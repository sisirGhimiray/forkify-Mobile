import resultView from "./Views/resultView.js";
import recipeState from "./model.js";
import searchView from "./Views/searchView.js";
import paginationView from "./Views/paginationView.js";
import previewView from "./Views/previewView.js";
import recipeView from "./Views/recipeView.js";

class Controller {
  static async controlSearchResults() {
    try {
      resultView._clear();
      resultView._renderSpinner();
      let query = searchView.getQuery();
      if (!query) return;

      await recipeState.loadSearchResults(query);
      resultView._clear();
      resultView.render(recipeState.getSearchResultPerPage());

      paginationView.render(recipeState.search);
    } catch (error) {
      // console.log("hey sisir");
      console.log(error);
    }
  }

  static moveToNextPageOfRecipeResult(page) {
    resultView._clear();
    paginationView._clear();
    resultView.render(recipeState.getSearchResultPerPage(page));
    paginationView.render(recipeState.search);
  }

  static async controlRecipe(id) {
    console.log(id);
    if (!id) return;

    await recipeState.loadRecipe(id);
    recipeView._clear();

    recipeView.render(recipeState.recipe);
    recipeView._showModal();
    recipeView._subscribeEv();
  }
}

function init() {
  searchView.addHandlerSearch(Controller.controlSearchResults);
  paginationView.addHandlerClick(Controller.moveToNextPageOfRecipeResult);
  previewView._addHandlerClick(Controller.controlRecipe);
}

init();
