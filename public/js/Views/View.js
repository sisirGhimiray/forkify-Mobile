export default class Views {
  _data;

  render(data, render = true) {
    // console.log(data);
    this._data = data;
    let markup = this._generateMarkup();
    // console.log(markup);
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return;
    }

    if (!render) return markup;
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
}
