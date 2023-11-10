class DropdownView {
  btnOpenDropdown = document.querySelector('.select-btn');
  #dropdownValue = document.querySelector('.select-btn .selected-value');
  #dropdownList = document.querySelector('.select-dropdown');
  #dropdownOptions = document.querySelectorAll('li label');

  addHandlers(handlerDropdown, handlerFont) {
    ['click', 'keydown'].forEach((eType) => {
      this.btnOpenDropdown.addEventListener(eType, function (e) {
        handlerDropdown(eType, e);
      });
    });

    this.#dropdownOptions.forEach(function (item) {
      item.addEventListener('click', function (e) {
        handlerFont(e.target.textContent);
      });
    });
  }

  toggleDropdown() {
    this.#dropdownList.classList.toggle('active');
  }

  closeDropdown(e) {
    if ([...this.btnOpenDropdown.children].includes(e?.target) || e?.target === this.btnOpenDropdown) return;

    this.#dropdownList.classList.remove('active');
  }

  setButtonText(font) {
    this.#dropdownValue.textContent = font;
  }

  
}

export default new DropdownView();
