// export default class showDefinition {
//   parentElement = document.querySelector('.main');

//   renderLoadingSpinner() {}
//   rederNotFoundContainer() {}
//   renderFoundContainer() {}
//   clear() {}
// }

const main = document.querySelector('.main');

export const displayDefinition = function (data) {
  main.innerHTML = '';

  console.log(data);
  const getMeanings = function (meaning) {
    return meaning.reduce((str, meaning) => {
      str += `
        <div class="part-of-speech">
          <span class="part-of-speech__word" id="part-of-speech">${meaning.partOfSpeech}</span>
          <span class="horizontal-line"></span>
        </div>
        <h3 class="heading-sm meaning__heading">Meaning</h3>
        <ul class="meaning__list" id="meaning">
         ${getMeaningsList(meaning)}       
        </ul>
        ${
          meaning.synonyms <= 0
            ? ''
            : `<div class="heading-sm synonym">Synonyms ${getSynonimsList(meaning)}
        </div>`
        }`;

      return str;
    }, '');
  };

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

  const markup = `
      <section class="found">

    <div class="definition">      
      <h1 class="heading-lg" id="word">${data.word}</h1>
      <h2 class="heading-md phonetic" id="phonetic">${data.phonetic}</h2>
      <button class="btn-play definition__btn" id="btn-play" onclick="playAudio()">
       <audio src="${
         data.phonetics[0].audio || data.phonetics[1].audio || data.phonetics[0].audio || data.phonetics[2].audio
       }" id="audio"></audio>   
      </button>
   </div>    
   <div class="meaning" id="meaning">
   ${getMeanings(data.meanings)}</div>
   <div class="horizontal-line"></div>    
   <div class="source body-sm">      
   <span class="source__heading">        
    Source
       <a href="${data.sourceUrls[0]}" class="source__link body-sm" id="source" target="_blank">${
    data.sourceUrls[0]
  }</a>
    </span>
   </div>
   </section>
  `;
  main.insertAdjacentHTML('afterbegin', markup);
};

export const renderReject = function () {
  main.innerHTML = '';
  const markup = `  
    <section class="not-found"> 
      <p class="not-found__emoji">😕</p>
      <h5 class="not-found__heading">No Definitions Found</h5>
      <p class="body-md">
          Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at
          later time or head to the web instead.
      </p>
    </section>`;

  main.insertAdjacentHTML('afterbegin', markup);
};
