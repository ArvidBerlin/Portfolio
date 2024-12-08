/* Dropdown for hamburger menu */

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const headerMenu = document.querySelector('.headermenu');

    hamburgerIcon.addEventListener('click', () => {
        headerMenu.classList.toggle('show');
    });
});