/* Dropdown for hamburger menu */

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const headerMenu = document.querySelector('.headermenu');

    hamburgerIcon.addEventListener('click', () => {

        if (headerMenu.classList.contains('show')) {
            headerMenu.classList.remove('show');
            headerMenu.classList.add('hide');
        } else {
            headerMenu.classList.remove('hide');
            headerMenu.classList.add('show');
        }
    });
});