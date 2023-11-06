import { renderLoadingSpinner } from './loadingSpinner.js';
import { requestDefinition } from './requestDefinition.js';
import * as dark from './darkMode.js';

const body = document.querySelector('body');
const main = document.querySelector('.main');

//------------------------------------------------------------------//

//HANDLE CHANGE THE FONT
const btnOpenDropdown = document.querySelector('.select-btn');
const dropdownValue = document.querySelector('.select-btn .selected-value');
const dropdownList = document.querySelector('.select-dropdown');
const dropdownOptions = document.querySelectorAll('li label');

const showDropdown = function () {
  dropdownList.classList.toggle('active');
};

const setFont = function (font) {
  body.style.fontFamily = font;
};

dropdownOptions.forEach((item) => {
  item.addEventListener('click', function () {
    dropdownValue.textContent = item.textContent;

    const selectFont = function (font) {
      if (font === 'mono') return "'Inconsolata', monospace";
      if (font === 'sans') return "'Inter', sans-serif";
      if (font === 'serif') return "'Lora', serif";
    };

    setFont(selectFont(item.textContent.toLowerCase().split(' ')[0]));
  });
});

btnOpenDropdown.addEventListener('click', showDropdown);

btnOpenDropdown.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  dropdownList.classList.remove('active');
});

//HANDLE SEARCH INPUT VALIDATION
const form = document.getElementById('form');
const inputSearch = document.getElementById('search');
const inputErrorMsg = document.getElementById('error-msg');

const handleInputError = function (action) {
  if (action === 'show') {
    inputSearch.classList.add('search__input--error');
    inputErrorMsg.classList.add('show');
  }
  if (action === 'hide') {
    inputSearch.classList.remove('search__input--error');
    inputErrorMsg.classList.remove('show');
  }
};

//Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  renderLoadingSpinner(main);

  if (!inputSearch.value) {
    handleInputError('show');
    return;
  }

  requestDefinition(inputSearch.value);
});

body.addEventListener('click', (e) => {
  handleInputError('hide');

  if ([...btnOpenDropdown.children].includes(e.target) || e.target === btnOpenDropdown) return;

  dropdownList.classList.remove('active');
});

function init() {
  requestDefinition('keyboard');

  if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    dark.btnToggleDarkMode.checked = true;
    dark.toggleDarkMode();
  }
}

window.addEventListener('load', init);
