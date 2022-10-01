import 'simplelightbox/dist/simple-lightbox.min.css';
import './sass/main.scss';

import simpleLightbox from 'simplelightbox';

import fetchImages from './js/fetch';
import { _notDefined } from './js/notify';

const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const resetBtn = document.querySelector('#reset');

const resetField = document.querySelector('.reset');
const gallery = document.querySelector('.gallery');
const footer = document.querySelector('footer');
const extend = document.querySelector('.search');

form.addEventListener('submit', onSubmit);
extend.addEventListener('click', onSubmit);
resetField.addEventListener('click', onReset);

let counter = 1;
let savedValue;
let lightbox;

async function onSubmit(event) {
  event.preventDefault();

  const searchValue = input.value;
  searchValue.trim();

  if (searchValue == '') {
    _notDefined();
  } else {
    if (searchValue != savedValue) {
      counter = 1;
    }
    savedValue = searchValue;

    await fetchImages(counter, searchValue, gallery).then(() => {
      if (lightbox) {
        lightbox.destroy();
      }
      lightbox = new simpleLightbox('.gallery div');
    });

    resetBtn.disabled = false;
    resetBtn.classList.add('active');
    resetBtn.addEventListener('click', onReset);

    counter += 1;
  }
}

function onReset(event) {
  resetBtn.disabled = true;
  gallery.innerHTML = '';

  counter = 1;

  footer.classList.add('hidden');

  input.value = '';

  resetBtn.classList.remove('active');
  resetBtn.removeEventListener('click', onReset);
}
