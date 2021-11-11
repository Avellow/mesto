export class FormValidator {
  constructor(props, form) {
    this._formSelector = form;
    //this._fieldSelector = props.fieldSelector;
    this._inputSelector = props.inputSelector;
    this._submitButtonSelector = props.submitButtonSelector;
    this._inactiveButtonClass = props.inactiveButtonClass;
    this._inputErrorClass = props.inputErrorClass;
    this._errorClass = props.errorClass;
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    const buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._formSelector, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}


/* ____________________________________- */
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

//enableValidation(currentProps);