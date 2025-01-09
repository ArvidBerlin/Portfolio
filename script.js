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


/* Resumé download check */

function setupDownloadConfirmation() {
  // Get elements
  const downloadLink = document.getElementById("download-link");
  const customConfirm = document.getElementById("custom-confirm");
  const confirmBox = customConfirm.querySelector(".confirm-box");
  const confirmYes = document.getElementById("confirm-yes");
  const confirmNo = document.getElementById("confirm-no");

  // Show confirm box when user clicks on link
  downloadLink.addEventListener("click", function (event) {
      event.preventDefault(); 
      customConfirm.style.display = "flex"; 
  });

  // If user confirms
  confirmYes.addEventListener("click", function () {
      const link = document.createElement("a");
      link.href = "/downloads/Arvid.pdf"; 
      link.download = "/downloads/Arvid.pdf"; 
      link.click(); 
      customConfirm.style.display = "none"; 
  });

  // If user aborts
  confirmNo.addEventListener("click", function () {
      customConfirm.style.display = "none"; 
      console.log("Download aborted."); 
  });

  // If user click outside of confirm box
  customConfirm.addEventListener("click", function (event) {  
    if (!confirmBox.contains(event.target)) {
        customConfirm.style.display = "none";
        console.log("Confirm box was closed by clicking outside of box.");
    }
});
}

// Run when page is loaded
document.addEventListener("DOMContentLoaded", function () {
  setupDownloadConfirmation();
});


/* Weather API */

document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = '95d39ad80b2ed7c430750b3533bffbaa'; 
    const CITY = 'Stockholm'; 
    const UNITS = 'metric'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${API_KEY}`;

    const weatherWidget = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    // Get weather data
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const { temp } = data.main;
            const { name } = data;
            const iconId = data.weather[0].icon;

            const iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;

            // Show weather
            weatherIcon.src = iconUrl;
            weatherIcon.alt = data.weather[0].description;
            weatherWidget.textContent = `Weather in ${name}: ${temp}°C`;
        })
        .catch(error => {
            weatherWidget.textContent = 'Could not load weather data.';
            console.error('Error fetching weather data:', error);
        });
});


/* Contact form validation */

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let isValid = true;

  // First name validation
  const firstName = document.getElementById('fname');
  const firstNameError = document.getElementById('fnameError');
  if (firstName.value.trim() === '') {
    firstNameError.textContent = 'First name can not be empty.';
    isValid = false;
  } else if (!/^[a-zA-ZåäöÅÄÖ\s]+$/.test(firstName.value)) {
    firstNameError.textContent = 'First name may only consist of letters.';
    isValid = false;
  } else {
    firstNameError.textContent = '';
  }

  // Last name validation
  const lastName = document.getElementById('lname');
  const lastNameError = document.getElementById('lnameError');
  if (lastName.value.trim() === '') {
    lastNameError.textContent = 'Last name can not be empty.';
    isValid = false;
  } else if (!/^[a-zA-ZåäöÅÄÖ\s]+$/.test(lastName.value)) {
    lastNameError.textContent = 'Last name may only consist of letters.';
    isValid = false;
  } else {
    lastNameError.textContent = '';
  }

  // Email validation
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  if (email.value.trim() === '') {
    emailError.textContent = 'Email can not be empty.';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  // Message validation
  const message = document.getElementById('message');
  const messageError = document.getElementById('messageError');
  if (message.value.trim() === '') {
    messageError.textContent = 'Message can not be empty.';
    isValid = false;
  } else {
    messageError.textContent = '';
  }

  // If everything is validated, send form
  if (isValid) {
      showConfirmation(); 
      clearForm(); 
    }
});

// Clear form function

function clearForm() {
  const form = document.getElementById('contactForm');
  form.reset();
}

  // Form confirmation message

  function showConfirmation() {
    const sendButton = document.querySelector('form button[type="submit"]');
    const form = sendButton.closest('form');

    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = 'Thank you for your message! I will get back to you as quickly as I can.';
    confirmationMessage.classList.add('confirmation-message'); 
  
    form.style.position = 'relative';

    form.appendChild(confirmationMessage);
  
    setTimeout(() => {
      confirmationMessage.remove();
    }, 4000);
  }