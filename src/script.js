//ELEMENT SELECTION

const body = document.querySelector('body');

const notFoundContainer = document.querySelector('.not-found');
const foundContainer = document.querySelector('.found');

const btnOpenDropdown = document.querySelector('.select-btn');
const dropdownValue = document.querySelector('.select-btn .selected-value');
const dropdownList = document.querySelector('.select-dropdown');
const dropdownOptions = document.querySelectorAll('li label');

const form = document.querySelector('form');
const inputSearch = document.getElementById('search');
const errorEmtpyInput = document.getElementById('error-msg');

const wordEl = document.getElementById('word');
const phoneticEl = document.getElementById('phonetic');
const meaningEl = document.getElementById('meaning');
const sourceEl = document.getElementById('source');

const btnToggleDarkMode = document.getElementById('check');

const btnPlay = document.getElementById('btn-play');
const audio = document.getElementById('audio');

//*** FUNCTIONS ***

//TOGGLE DARK MODE
const toggleDarkMode = function () {
  body.classList.toggle('dark');
};

//HANDLE THE DROPDOWN MENU
const handleDropdown = function () {
  dropdownList.classList.toggle('active');
};

const showEmptyImputError = function () {
  inputSearch.classList.add('search__input--error');
  errorEmtpyInput.classList.add('show');
};

const hideEmptyImputError = function () {
  inputSearch.classList.remove('search__input--error');
  errorEmtpyInput.classList.remove('show');
};

const requestDefinition = async function (wordInp) {
  try {
    const request = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInp}`);
    if (request.ok !== true) throw new Error();

    const [data] = await request.json();
    console.log(data);

    displayDefinition(data);
  } catch {
    handleNotFound();
  }
};
requestDefinition('keyboard');

const handleNotFound = function () {
  foundContainer.classList.remove('show');
  notFoundContainer.classList.add('show');
};

const displayDefinition = async function (data) {
  notFoundContainer.classList.remove('show');
  foundContainer.classList.add('show');
  meaningEl.innerHTML = '';
  wordEl.textContent = data.word;
  phoneticEl.textContent = data.phonetic;
  sourceEl.textContent = data.sourceUrls[0];
  audio.setAttribute('src', data.phonetics[0]?.audio || data.phonetics[1]?.audio || data.phonetics[2]?.audio);

  data.meanings.forEach((meaning) => {
    const markup = `
        <div class="part-of-speech">
          <span class="part-of-speech__word" id="part-of-speech">${meaning.partOfSpeech}</span>
          <span class="horizontal-line"></span>
        </div>
        <h3 class="heading-sm meaning__heading">Meaning</h3>
        <ul class="meaning__list" id="meaning">
         ${meaning.definitions.reduce((str, cur) => {
           str += `<li class="meaning__list-item body-md">
         <span class="meaning__list-disc"></span>(etc.) ${cur.definition}
         </li>
         ${cur.example ? `<li class="meaning__list-item--example body-md">“${cur.example}”</li>` : ''}
         `;
           return str;
         }, '')}       
        </ul>

        ${
          meaning.synonyms.length > 0
            ? ` <div class="heading-sm synonym">
          Synonyms
          <a href="#" class="synonym__link" target="_blank">${meaning.synonyms.join(', ')}</a>
        </div>`
            : ''
        }
       
        `;

    meaningEl.insertAdjacentHTML('beforeend', markup);
  });
};

//HANDLE THE FONT FAMILY
dropdownOptions.forEach((item) => {
  item.addEventListener('click', function () {
    dropdownValue.textContent = item.textContent;

    const selectFontFamily = function (fontFamily) {
      if (fontFamily === 'mono') return "'Inconsolata', monospace";
      if (fontFamily === 'sans') return "'Inter', sans-serif";
      if (fontFamily === 'serif') return "'Lora', serif";
    };

    body.style.fontFamily = selectFontFamily(item.textContent.toLowerCase().split(' ')[0]);
  });
});

//HANDLE SEARCH INPUT
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!inputSearch.value) showEmptyImputError();

  requestDefinition(inputSearch.value);
});
//
//
//
//
//
//
// *** EVENT LISTENERS ***

btnOpenDropdown.addEventListener('click', handleDropdown);

btnOpenDropdown.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  dropdownList.classList.remove('active');
});

body.addEventListener('click', (e) => {
  hideEmptyImputError();

  if ([...btnOpenDropdown.children].includes(e.target) || e.target === btnOpenDropdown) return;
  dropdownList.classList.remove('active');
});

inputSearch.addEventListener('focus', hideEmptyImputError);

btnToggleDarkMode.addEventListener('click', toggleDarkMode);

btnPlay.addEventListener('click', () => {
  audio.play();
});
