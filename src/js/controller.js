import DefinitionView from './views/definitionView.js';
import LoadingSpinner from './views/loadingSpinnerView.js';
import SearchView from './views/searchView.js';
import GlobalView from './views/globalView.js';
import DropdownView from './views/dropdownView.js';

import { requestDefinition } from './model.js';
import { state } from './model.js';

import * as dark from './views/darkMode.js';
import definitionView from './views/definitionView.js';

const controlSearch = async function () {
  try {
    //1. Get query from the input
    const query = SearchView.getQuery();
    if (!query) return;

    //2. Render loading spinner
    LoadingSpinner.render();

    //3. Request definiton
    await requestDefinition(query);

    //3. Render  definition
    DefinitionView.renderDefinition(state.results);
  } catch {
    DefinitionView.renderReject();
  }
};

const controlPlayBtn = function (audio) {
  definitionView.playAudio(audio);
};

const controlDropdown = function (eType, e) {
  //1) Click on button, open the dropdown menu and set its value

  if (eType === 'click') DropdownView.toggleDropdown();

  if (eType === 'keydown') {
    if (e.key !== 'Escape') return;
    DropdownView.closeDropdown();
  }
};

const controlFont = function (font) {
  //1)Get font from dropdown menu click and set the font on the button
  DropdownView.setButtonText(font);

  //2)Set the font to the document
  GlobalView.setFontBody(font);
};

const controlGlobal = function (e) {
  //1) Remove error from input when click on body
  SearchView.handleInputError.bind(SearchView)('hide');

  //2) Close dropdown menu when click on body
  DropdownView.closeDropdown(e);
};

//INIT FUNCTION
async function init() {
  DefinitionView.addHandler(controlPlayBtn);
  SearchView.addHandler(controlSearch);

  GlobalView.addHandler(controlGlobal);

  DropdownView.addHandlers(controlDropdown, controlFont);

  await requestDefinition('keyboard');
  DefinitionView.renderDefinition(state.results);

  if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    dark.btnToggleDarkMode.checked = true;
    dark.toggleDarkMode();
  }
}

init();
