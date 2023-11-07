import { displayDefinition, renderReject } from './renderView.js';

export const requestDefinition = async function (wordInp) {
  
  try {
    const request = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInp}`);
    if (!request.ok === true) throw new Error();

    const [data] = await request.json();

    displayDefinition(data);
  } catch {
    renderReject();
  }
};
