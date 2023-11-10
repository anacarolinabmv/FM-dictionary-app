class SearchView {
  #form = document.getElementById('form');
  input = document.getElementById('search');
  #errorMsg = document.getElementById('error-msg');

  #clearInput() {
    this.input.value = '';
  }

  addHandler(handler) {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  handleInputError(action) {
    if (action === 'show') {
      this.input.classList.add('search__input--error');
      this.#errorMsg.classList.add('show');
    }
    if (action === 'hide') {
      this.input.classList.remove('search__input--error');
      this.#errorMsg.classList.remove('show');
    }
  }

  getQuery() {
    const query = this.input.value;
    if (!query) return this.handleInputError('show');
    this.#clearInput();
    return query;
  }
}

export default new SearchView();
