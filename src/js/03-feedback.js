import throttle from 'lodash.throttle';
const refs = {
  formEl: document.querySelector('.feedback-form'),
  inputEl: document.querySelector('input'),
  textareaEl: document.querySelector('textarea'),
  buttonEl: document.querySelector('button'),
};

const FORM_MESSAGE = 'feedback-form-state';
let formData = {};

populateData();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onInputData, 500));

function onInputData(event) {
  const email = event.target.value.trim();
  formData[event.target.name] = event.target.value.trim();

  try {
    localStorage.setItem(FORM_MESSAGE, JSON.stringify(formData));
  } catch (error) {
    console.log(error.message);
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  if (refs.inputEl.value === '' || refs.textareaEl.value === '') return;
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(FORM_MESSAGE);
}

function populateData() {
  try {
    const savedData = localStorage.getItem(FORM_MESSAGE);
    if (!savedData) return;

    formData = JSON.parse(savedData);

    refs.inputEl.value = formData[refs.inputEl.name] || '';
    refs.textareaEl.value = formData[refs.textareaEl.name] || '';
  } catch (error) {
    console.log(error.message);
  }
}
