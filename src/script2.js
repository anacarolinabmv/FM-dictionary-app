//ELEMENT SELECTION

const body = document.querySelector('body');

const form = document.querySelector('form');
const inputSearch = document.getElementById('search');
const errorEmtpyInput = document.getElementById('error-msg');

const wordEl = document.getElementById('word');
const phoneticEl = document.getElementById('phonetic');
const meaningEl = document.getElementById('meaning');
const sourceEl = document.getElementById('source');

const btnPlay = document.getElementById('btn-play');
const audio = document.getElementById('audio');

//*** FUNCTIONS ***

//TOGGLE DARK MODE
const btnToggleDarkMode = document.getElementById('check');
const toggleDarkMode = function () {
  body.classList.toggle('dark');
};

if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
  btnToggleDarkMode.checked = true;
  toggleDarkMode();
}

btnToggleDarkMode.addEventListener('click', toggleDarkMode);

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

//------------------------------------------------------------------//

//HANDLE SEARCH INPUT VALIDATION
const showEmptyImputError = function (action) {
  inputSearch.classList.add('search__input--error');
  errorEmtpyInput.classList.add('show');
};

const hideEmptyImputError = function () {
  inputSearch.classList.remove('search__input--error');
  errorEmtpyInput.classList.remove('show');
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!inputSearch.value) showEmptyImputError();

  requestDefinition(inputSearch.value);
});

inputSearch.addEventListener('focus', hideEmptyImputError);

//REQUEST AND DISPLAY DATA

const wordNotFoundContainer = document.querySelector('.not-found');
const wordDefinitionContainer = document.querySelector('.found');

const requestDefinition = async function (wordInp) {
  try {
    const request = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInp}`);
    if (request.ok !== true) throw new Error();

    const [data] = await request.json();

    displayDefinition(data);
  } catch {
    handleReject();
  }
};

requestDefinition('keyboard');

const handleReject = function () {
  wordDefinitionContainer.classList.remove('show');
  wordNotFoundContainer.classList.add('show');
};

const displayDefinition = async function (data) {
  wordNotFoundContainer.classList.remove('show');
  wordDefinitionContainer.classList.add('show');
  let arr = [];
  meaningEl.innerHTML = '';
  wordEl.textContent = data.word;
  phoneticEl.textContent = data.phonetic;
  sourceEl.textContent = data.sourceUrls[0];
  audio.setAttribute('src', data.phonetics[0]?.audio || data.phonetics[1]?.audio || data.phonetics[2]?.audio);

  const getMeaningsList = function (arrMeanings) {
    return arrMeanings.definitions.reduce((str, cur) => {
      str += `<li class="meaning__list-item body-md">
         <span class="meaning__list-disc"></span>(etc.) ${cur.definition}
         </li>
         ${cur.example ? `<li class="meaning__list-item--example body-md">“${cur.example}”</li>` : ''}
         `;
      return str;
    }, '');
  };

  const getSynonimsList = function (arrMeanings) {
    return arrMeanings.synonyms.reduce((str, synonym) => {
      str += `<a href="https://en.wiktionary.org/wiki/${synonym.replace(
        ' ',
        '_'
      )}" class="synonym__link" target="_blank">${synonym} </a>`;
      return str;
    }, '');
  };

  data.meanings.forEach((meaning) => {
    const markup = `
        <div class="part-of-speech">
          <span class="part-of-speech__word" id="part-of-speech">${meaning.partOfSpeech}</span>
          <span class="horizontal-line"></span>
        </div>
        <h3 class="heading-sm meaning__heading">Meaning</h3>
        <ul class="meaning__list" id="meaning">
         ${getMeaningsList(meaning)}       
        </ul>

        ${meaning.synonyms <= 0 ? '' : `<div class="heading-sm synonym">Synonyms ${getSynonimsList(meaning)}</div>`}
          
       
        `;
    arr = '';
    meaningEl.insertAdjacentHTML('beforeend', markup);
  });
};

// *** EVENT LISTENERS ***

body.addEventListener('click', (e) => {
  hideEmptyImputError();

  if ([...btnOpenDropdown.children].includes(e.target) || e.target === btnOpenDropdown) return;
  dropdownList.classList.remove('active');
});

btnPlay.addEventListener('click', () => {
  audio.play();
});
