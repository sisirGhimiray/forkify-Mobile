import Views from "./View.js";

import previewView from "./previewView.js";

class ResultView extends Views {
  _parentEl = document.querySelector(".results");

  _errorMessage = "No recipes found for your query! Please try again";

  _message = "";

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new ResultView();
