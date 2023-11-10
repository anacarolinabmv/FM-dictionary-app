class GlobalView {
  #body = document.querySelector('body');

  addHandler(handler) {
    this.#body.addEventListener('click', (e) => {
      handler(e);
    });
  }

  setFontBody(font) {
    const getFontName = function (font) {
      if (font === 'Mono') return "'Inconsolata', monospace";
      if (font === 'Sans Serif') return "'Inter', sans-serif";
      if (font === 'Serif') return "'Lora', serif";
    };

    this.#body.style.fontFamily = getFontName(font);
  }
}

export default new GlobalView();
