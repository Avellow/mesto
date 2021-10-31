//пропсы 
const currentProps = {
  formSelector: '.form',
  fieldSelector: '.form__field',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//проверка валидности переданных инпутов
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

//раз-/блокирует кнопку submit на основании валидации полей
function toggleButtonState(inputList, buttonElement, props) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(props.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(props.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//показывает ошибку под переданным инпутом
function showInputError(formElement, inputElement, errorMessage, props) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(props.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(props.errorClass);
}

//прячет ошибку
function hideInputError(formElement, inputElement, props) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(props.inputErrorClass);
  errorElement.classList.remove(props.errorClass);
  errorElement.textContent = '';
}

//показывает или прячет ошибку конкретного инпута
function checkInputValidity(formElement, inputElement, props) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, props);
  } else {
    hideInputError(formElement, inputElement, props);
  }
}

//устанавливает слушателей для проверки полей и раз-/блокировки кнопки submit
function setEventListeners(formElement, props) {
  const inputList = Array.from(formElement.querySelectorAll(props.inputSelector));
  const buttonElement = formElement.querySelector(props.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, props);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, props);
      toggleButtonState(inputList, buttonElement, props);
    });
  });
}

//активация валидации на основании пропсов
function enableValidation(props) {
  const formElements = Array.from(document.querySelectorAll(props.formSelector));
  formElements.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());
    const fieldsetList = Array.from(formElement.querySelectorAll(props.fieldSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset, props);
    });
  });
}

enableValidation(currentProps);