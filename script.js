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
    event.preventDefault(); // Hindra formuläret från att skickas
  
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
    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = 'Thank you for your message! I will get back to you as quickly as I can.';
    confirmationMessage.style.position = 'fixed';
    confirmationMessage.style.bottom = '100px';
    confirmationMessage.style.left = '145px';
    confirmationMessage.style.backgroundColor = '#c68061';
    confirmationMessage.style.color = '#ffffff';
    confirmationMessage.style.padding = '15px';
    confirmationMessage.style.borderRadius = '8px';
    confirmationMessage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    confirmationMessage.style.zIndex = '1000';
    confirmationMessage.style.fontSize = '14px';
  
    document.body.appendChild(confirmationMessage);
  
    setTimeout(() => {
      confirmationMessage.remove();
    }, 5000);
  }