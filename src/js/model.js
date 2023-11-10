export const state = {
  results: {},
};

export const requestDefinition = async function (wordInp) {
  try {
    const request = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInp}`);
    if (!request.ok === true) throw new Error();

    const [data] = await request.json();

    state.results = {
      word: data.word,
      phonetic: data.phonetic,
      meanings: data.meanings,
      sourceUrls: data.sourceUrls,
      phonetics: data.phonetics,
    };

    // return data;
  } catch {
    throw err;
  }
};
