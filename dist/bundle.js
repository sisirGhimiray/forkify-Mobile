(() => {
  // public/js/Views/View.js
  var Views = class {
    _data;
    render(data, render = true) {
      this._data = data;
      let markup = this._generateMarkup();
      if (!data || Array.isArray(data) && data.length === 0) {
        return;
      }
      if (!render)
        return markup;
      this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
    _clear() {
      this._parentEl.innerHTML = "";
    }
    _renderSpinner() {
      let spinnerMarkup = `<div class="spinner-container">
    <div class="spinner"></div>
  </div>`;
      this._parentEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
    }
  };

  // public/js/Views/previewView.js
  var PreviewView = class extends Views {
    _parentElement = "";
    _eventHandler(handler) {
      ["load", "hashchange"].forEach(function(el) {
        window.addEventListener(el, function(e) {
          let id = window.location.hash.slice(1);
          handler(id);
        });
      });
      PreviewView._addHandlerClick();
    }
    static _addHandlerClick() {
      let previewClick = document.querySelector(".results");
      previewClick.addEventListener("click", function(e) {
        let supId = e.target.closest(".result");
        previewClick.querySelectorAll("li").forEach(function(el) {
          if (el.classList.contains("preview--active")) {
            el.classList.remove("preview--active");
          }
        });
        supId.classList.add("preview--active");
      });
    }
    _generateMarkup() {
      return `<li class="result">
    <a href="#${this._data.recipe_id}" class="preview-link">
      <figure class="prev__fig">
        <img
          class="preview-img"
          src="${this._data.image_url}"
          alt="dish image"
          srcset=""
        />
      </figure>
      <div class="preview-box">
        <h4 class="preview-title">${this._data.title}</h4>
        <p class="preview-publisher">
          ${this._data.publisher}
        </p>
      </div>
    </a>
  </li>`;
    }
  };
  var previewView_default = new PreviewView();

  // public/js/Views/resultView.js
  var ResultView = class extends Views {
    _parentEl = document.querySelector(".results");
    _errorMessage = "No recipes found for your query! Please try again";
    _message = "";
    _generateMarkup() {
      return this._data.map((result) => previewView_default.render(result, false)).join("");
    }
  };
  var resultView_default = new ResultView();

  // public/js/config.js
  var API_URL = `https://forkify-api.herokuapp.com/api`;
  var RES_PER_PAGE = 5;

  // public/js/ajax.js
  var CallRecipeApi = class {
    static timeOut(time) {
      return new Promise(function(_, reject) {
        setTimeout(() => {
          reject(
            new Error(`Request took too long! Timeout after ${time} second`)
          );
        }, time * 1e3);
      });
    }
    static async withRecipeName(recipeName) {
      try {
        const response = await fetch(`${API_URL}/search?q=${recipeName}`);
        const res = await Promise.race([response, this.timeOut(5)]);
        const data = await res.json();
        if (response.ok === false) {
          throw new Error(data.error);
        }
        return data;
      } catch (error) {
        throw error;
      }
    }
    static async withRecipeId(recipeId) {
      try {
        const response = await fetch(`${API_URL}/get?rId=${recipeId}`);
        const res = await Promise.race([response, this.timeOut]);
        let data = res.json();
        return data;
      } catch (error) {
        console.log(error);
        console.log(error);
      }
    }
  };
  var ajax_default = CallRecipeApi;

  // public/js/model.js
  var RecipeState = class {
    recipe = null;
    search = {
      query: "",
      results: [],
      page: 1,
      resultPerPage: RES_PER_PAGE
    };
    async loadRecipe(id) {
      try {
        const res = await ajax_default.withRecipeId(id);
        this.recipe = res.recipe;
      } catch (error) {
        throw error;
      }
    }
    async loadSearchResults(query) {
      try {
        let res = await ajax_default.withRecipeName(query);
        if (res.error) {
          throw new Error(res.error);
        }
        this.search.query = query;
        this.search.results = res.recipes.map((rec) => rec);
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
  };
  var recipeState = new RecipeState();
  var model_default = recipeState;

  // public/js/Views/searchView.js
  var SearchView = class {
    _parentEl = document.querySelector(".search-input-btn");
    getQuery() {
      const query = this._parentEl.querySelector(".search").value;
      this._clearInput();
      return query;
    }
    _clearInput() {
      this._parentEl.querySelector(".search").value = "";
    }
    addHandlerSearch(handler) {
      this._parentEl.addEventListener("submit", function(e) {
        e.preventDefault();
        handler();
      });
    }
  };
  var searchView_default = new SearchView();

  // public/js/Views/paginationView.js
  var PaginationView = class extends Views {
    _parentEl = document.querySelector(".pagination");
    addHandlerClick(handler) {
      this._parentEl.addEventListener("click", function(e) {
        console.log("hello button click");
        let btn = e.target.closest(".btn--inline");
        console.log(btn);
        if (!btn)
          return;
        let goToPage = +btn.dataset.goto;
        handler(goToPage);
      });
    }
    _generateMarkup() {
      let curPage = this._data.page;
      let lastPage = Math.ceil(
        this._data.results.length / this._data.resultPerPage
      );
      if (curPage === 1) {
        return `<button data-goto=${this._data.page + 1} class="btn--inline pagination__button--next"><span>Page ${this._data.page + 1}</span></button>`;
      }
      if (curPage > 1 && curPage < lastPage) {
        return `<button data-goto=${curPage - 1} class="btn--inline pagination__button--prev"><span>Page ${curPage - 1}</button>
        <button data-goto=${curPage + 1} class="btn--inline pagination__button--next"><span>Page ${curPage + 1}</span></button>`;
      }
      if (curPage === lastPage) {
        return `<button data-goto=${curPage - 1} class="btn--inline pagination__button--prev"><span>Page ${curPage - 1}</span></button>`;
      }
    }
  };
  var paginationView_default = new PaginationView();

  // public/js/Views/recipeView.js
  var RecipeView = class extends Views {
    _parentEl = document.querySelector(".recipecontainer__modal");
    _addHandlerClick() {
    }
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
    <span class="close__modal">\xD7</span>
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
  };
  var recipeView_default = new RecipeView();

  // public/js/controller.js
  var Controller = class {
    static async controlSearchResults() {
      try {
        resultView_default._clear();
        resultView_default._renderSpinner();
        let query = searchView_default.getQuery();
        if (!query)
          return;
        await model_default.loadSearchResults(query);
        resultView_default._clear();
        resultView_default.render(model_default.getSearchResultPerPage());
        paginationView_default.render(model_default.search);
      } catch (error) {
        console.log(error);
      }
    }
    static moveToNextPageOfRecipeResult(page) {
      resultView_default._clear();
      paginationView_default._clear();
      resultView_default.render(model_default.getSearchResultPerPage(page));
      paginationView_default.render(model_default.search);
    }
    static async controlRecipe(id) {
      console.log(id);
      if (!id)
        return;
      await model_default.loadRecipe(id);
      recipeView_default.render(model_default.recipe);
      recipeView_default._showModal();
      recipeView_default._subscribeEv();
    }
  };
  function init() {
    searchView_default.addHandlerSearch(Controller.controlSearchResults);
    paginationView_default.addHandlerClick(Controller.moveToNextPageOfRecipeResult);
    previewView_default._eventHandler(Controller.controlRecipe);
  }
  init();
})();
