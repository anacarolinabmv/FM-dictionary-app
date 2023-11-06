const body = document.querySelector('body');

export const btnToggleDarkMode = document.getElementById('check');
export const toggleDarkMode = function () {
  body.classList.toggle('dark');
};

btnToggleDarkMode.addEventListener('click', toggleDarkMode);
