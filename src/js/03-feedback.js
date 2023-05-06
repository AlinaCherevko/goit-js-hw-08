import throttle from 'lodash.throttle';
const refs = {
  formEl: document.querySelector('.feedback-form'),
};

const FORM_MESSAGE = 'feedback-form-state';
let formData = {};

populateData();

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onInputData, 500));

function onInputData(event) {
  try {
    const value = event.target.value.trim();
    formData[event.target.name] = value;
    localStorage.setItem(FORM_MESSAGE, JSON.stringify(formData));
  } catch (error) {
    console.log(error.message);
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  // if (refs.inputEl.value === '' || refs.textareaEl.value === '') return;
  console.log(formData);
  formData = {};
  event.currentTarget.reset();
  localStorage.removeItem(FORM_MESSAGE);
}

function populateData() {
  try {
    const savedData = localStorage.getItem(FORM_MESSAGE);
    if (!savedData) return;

    formData = JSON.parse(savedData);
    Object.entries(formData).forEach(([key, value]) => {
      refs.formEl.elements[key].value = value;
    });
  } catch (error) {
    console.log(error.message);
  }
}
