import Views from "./View";

class RecipeView extends Views {
  _parentEl = document.querySelector(".recipecontainer__modal");

  _addHandlerClick() {}

  _subscribeEv() {
    let closeBtn = document.querySelector(".close__modal");
    closeBtn.addEventListener("click", this._hideModal.bind(this));
  }

  _showModal() {
    this._parentEl.classList.remove("hidden");
  }

  _hideModal() {
    this._clear();
    this._parentEl.classList.add("hidden");
  }

  _generateMarkup() {
    return `
    <span class="close__modal">×</span>
    <figure class="recipe__fig">
      <img class="recipeImage" src="${this._data.image_url}" alt="recipe Image" />
      <h1 class="recipeTitle">
        <span>${this._data.title}</span>
      </h1>
    </figure>
    <div class="recipe__details"></div>
    <div class="recipe--ingredients"></div>
    <div class="recipe--Cooking--way"></div>
    `;
  }
}

export default new RecipeView();
