class DefinitionView {
  #parentElement = document.querySelector('.main');
  #data;

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  addHandler(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('button#btn-play');
      const audio = button.querySelector('#audio');

      handler(audio);
    });
  }

  playAudio = function (audio) {
    audio.play();
  };

  #getMarkup = function () {
    return this.#data.meanings.reduce((str, meaning) => {
      str += `
        <div class="part-of-speech">
          <span class="part-of-speech__word">${meaning.partOfSpeech}</span>
          <span class="horizontal-line"></span>
        </div>
        <h3 class="heading-sm meaning__heading">Meaning</h3>
        <ul class="meaning__list" id="meaning">
         ${this.#getMeaningsList(meaning)}       
        </ul>
        ${
          meaning.synonyms <= 0
            ? ''
            : `<div class="heading-sm synonym">Synonyms ${this.#getSynonimsList(meaning)}
        </div>`
        }`;

      return str;
    }, '');
  };

  #getMeaningsList = function (arrMeanings) {
    return arrMeanings.definitions.reduce((str, cur) => {
      str += `<li class="meaning__list-item body-md">
         <span class="meaning__list-disc"></span>${cur.definition}
         </li>
         ${cur.example ? `<li class="meaning__list-item--example body-md">“${cur.example}”</li>` : ''}
         `;
      return str;
    }, '');
  };

  #getSynonimsList = function (arrMeanings) {
    return arrMeanings.synonyms.reduce((str, synonym) => {
      str += `<a href="https://en.wiktionary.org/wiki/${synonym.replace(
        ' ',
        '_'
      )}" class="synonym__link" target="_blank">${synonym} </a>`;
      return str;
    }, '');
  };

  renderDefinition(data) {
    this.#data = data;
    const markup = `
      <section class="found">
        <div class="definition">      
          <h1 class="heading-lg" id="word">${this.#data.word}</h1>
          <h2 class="heading-md phonetic" id="phonetic">${this.#data.phonetic}</h2>
          <button class="btn-play definition__btn" id="btn-play">
            <audio src="${
              this.#data.phonetics[0].audio || this.#data.phonetics[1].audio || this.#data.phonetics[2].audio
            }" id="audio"></audio>   
          </button>
        </div>

        <div class="meaning" id="meaning">
          ${this.#getMarkup()}
        </div>

        <div class="horizontal-line"></div>    
        
        <div class="source body-sm">      
          <span class="source__heading">        
            Source
              <a href="${this.#data.sourceUrls[0]}" class="source__link body-sm" id="source" 
              target="_blank">${this.#data.sourceUrls[0]}</a>
          </span>
        </div>
     </section>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderReject() {
    const markup = `
      <section class="not-found"> 
        <p class="not-found__emoji">😕</p>
        <h5 class="not-found__heading">No Definitions Found</h5>
        <p class="body-md">
            Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at
            later time or head to the web instead.
        </p>
      </section>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new DefinitionView();
