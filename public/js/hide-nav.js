const nav = document.querySelector('#main-nav');

function hideNav() {
    nav.classList.add('hidden');
}

window.addEventListener('load', hideNav);