import Views from "./View";

class RecipeView extends Views {
  _parentEl = document.querySelector(".recipecontainer__modal");

  _addHandlerClick() {}

  _subscribeEv() {
    let closeBtn = document.querySelector(".close__modal");
    closeBtn.addEventListener("click", this._hideModal.bind(this));
  }

  _showModal() {
    // this._clear();
    this._parentEl.classList.remove("hidden");
    console.log(this._data);
  }

  _hideModal() {
    this._parentEl.classList.add("hidden");
    this._clear();
    this._pushState();
  }

  _pushState() {
    let newUrl = "http://localhost:5501/forkify.html";

    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  _generateMarkup() {
    console.log(this._data);
    return `
    <span class="close__modal">×</span>
    <figure class="recipe__fig">
      <img class="recipeImage" src="${
        this._data.image_url
      }" alt="recipe Image" />
      <h1 class="recipeTitle">
        <span>${this._data.title}</span>
      </h1>
    </figure>
    <div class="recipe__details">
      <span>${this._data.cooking_time} MINUTES</span>
      <span>${this._data.servings} SERVINGS</span>
    </div>
    <div class="recipe--ingredients">
    <ul class="recipe__ingredientList">

    ${this._data.ingredients
      .map(
        (val) =>
          `<li>${[
            val.quantity,
            val.unit ? val.unit : "",
            val.description ? val.description : "",
          ].join(" ")}</li>`
      )
      .join("")}
    
    </ul>
    </div>
    <div class="recipe--Cooking--way">
          
    <h2>HOW TO COOK IT</h2>
    <p>This recipe was carefully designed and tested by ${
      this._data.publisher
    }. Please check out directions at their website. </p>
    <a href=${this._data.source_url}>
    DIRECTIONS ->
    </a>
    </div>
    `;
  }
}

export default new RecipeView();
