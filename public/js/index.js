import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

// DELEGATION

if (bookBtn) {
  bookBtn.addEventListener('click', (event) => {
    event.target.textContent = 'Procession...';
    const { tourId } = event.target.dataset;
    bookTour(tourId);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.querySelector('.btn--save-password');
    btn.textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    btn.textContent = 'Save password';
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(form);

    updateSettings(form, 'data');
  });
}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
