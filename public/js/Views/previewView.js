import Views from "./View.js";

class PreviewView extends Views {
  _parentElement = "";

  _eventHandler(handler) {
    ["load", "hashchange"].forEach(function (el) {
      window.addEventListener(el, function (e) {
        let id = window.location.hash.slice(1);

        handler(id);
      });
    });
    PreviewView._addHandlerClick();
  }

  static _addHandlerClick() {
    let previewClick = document.querySelector(".results");

    previewClick.addEventListener("click", function (e) {
      let supId = e.target.closest(".result");

      previewClick.querySelectorAll("li").forEach(function (el) {
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
}

export default new PreviewView();
