class LoadingSpinner {
  #parentElement = document.querySelector('main');

  setParentElement(parentElement) {
    this.#parentElement = parentElement;
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  render() {
    const markup = `
  <div class="loading-spinner" id="loading-spinner">
        <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g class="spinner_OSmW">
            <rect x="11" y="1" width="2" height="5" opacity=".14" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(30 12 12)" opacity=".29" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(60 12 12)" opacity=".43" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(90 12 12)" opacity=".57" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(120 12 12)" opacity=".71" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(150 12 12)" opacity=".86" />
            <rect x="11" y="1" width="2" height="5" transform="rotate(180 12 12)" />
          </g>
        </svg>
      </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new LoadingSpinner();
