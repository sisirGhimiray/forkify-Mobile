import CallRecipeApi from "./ajax.js";
import { RES_PER_PAGE } from "./config.js";
class RecipeState {
  recipe = null;
  search = {
    query: "",
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  };

  async loadRecipe(id) {
    try {
      const res = await CallRecipeApi.withRecipeId(id);

      this.recipe = res.data.recipe;
    } catch (error) {
      throw error;
    }
  }

  async loadSearchResults(query) {
    try {
      let res = await CallRecipeApi.withRecipeName(query);
      console.log(recipeState);
      if (res.error) {
        throw new Error(res.error);
      }
      this.search.query = query;

      this.search.results = res.data.recipes.map((rec) => rec);
    } catch (error) {
      throw error;
    }
  }

  getSearchResultPerPage(page = this.search.page) {
    this.search.page = page;
    const start = (page - 1) * this.search.resultPerPage;
    const end = page * this.search.resultPerPage;

    return this.search.results.slice(start, end);
  }

  showRecipe() {
    console.log(this.recipe);
  }
}

const recipeState = new RecipeState();

export default recipeState;
