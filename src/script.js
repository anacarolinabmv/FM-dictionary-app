const btnOpenDropdown = document.querySelector('.select-btn');
const dropdownValue = document.querySelector('.select-btn .selected-value');
const dropdownList = document.querySelector('.select-dropdown');
const dropdownOptions = document.querySelectorAll('li label');

const body = document.querySelector('body');

//HANDLE THE DROPDOWN MENU
const handleDropdown = function () {
  dropdownList.classList.toggle('active');
};

// EVENT LISTENERS
btnOpenDropdown.addEventListener('click', handleDropdown);
btnOpenDropdown.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  dropdownList.classList.remove('active');
});

body.addEventListener('click', (e) => {
  if ([...btnOpenDropdown.children].includes(e.target) || e.target === btnOpenDropdown) return;
  dropdownList.classList.remove('active');
});

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
