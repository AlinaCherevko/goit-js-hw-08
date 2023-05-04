import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
// const simpleLightBox = require('simplelightbox');
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);
const ulEl = document.querySelector('.gallery');
ulEl.style.listStyle = 'none';
const galleryContent = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
         <img class="gallery__image" src="${preview}" alt="${description}" />
      </a>
   </li>`
  )
  .join('');

ulEl.insertAdjacentHTML('beforeend', galleryContent);

var gallery = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionDelay: 500,
});
