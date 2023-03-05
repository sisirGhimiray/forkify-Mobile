import Views from "./View";

class PaginationView extends Views {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      console.log("hello button click");
      let btn = e.target.closest(".btn--inline");
      console.log(btn);
      if (!btn) return;

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
      return `<button data-goto=${
        this._data.page + 1
      } class="btn--inline pagination__button--next"><span>Page ${
        this._data.page + 1
      }</span></button>`;
    }

    if (curPage > 1 && curPage < lastPage) {
      return `<button data-goto=${
        curPage - 1
      } class="btn--inline pagination__button--prev"><span>Page ${
        curPage - 1
      }</button>
        <button data-goto=${
          curPage + 1
        } class="btn--inline pagination__button--next"><span>Page ${
        curPage + 1
      }</span></button>`;
    }

    if (curPage === lastPage) {
      return `<button data-goto=${
        curPage - 1
      } class="btn--inline pagination__button--prev"><span>Page ${
        curPage - 1
      }</span></button>`;
    }
  }
}

export default new PaginationView();
