import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.form');
    this._inputElements = Array.from(this._popupElement.querySelectorAll('.form__input'));
    this._inputNameElement = this._inputElements.find(el => el.name.includes('username'));
    this._inputJobElement = this._inputElements.find(el => el.name.includes('job'));
    this._submitButtonElement = this._popupElement.querySelector('.form__submit');
    this._defaultButtonStatus = this._submitButtonElement.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach(el => {
      inputValues[el.name] = el.value;
    });
    return inputValues;
  }

  _deleteCurrentValues() {
    this._inputElements.forEach(el => el.value = '');
  }

  _submittingFormCallback = (evt) => {
    evt.preventDefault();
    const data = this._getInputValues();
    this._handleFormSubmit(data);
  }

  close() {
    super.close();
    this._deleteCurrentValues();
    this._form.removeEventListener('submit', this._submittingFormCallback);
  }

  changeStatus(isSaving) {
    isSaving
      ? this._submitButtonElement.textContent = "Сохранение..."
      : this._submitButtonElement.textContent = this._defaultButtonStatus;
  }

  setInputUserValues({ username, job }) {
    this._inputNameElement && (this._inputNameElement.value = username);
    this._inputJobElement && (this._inputJobElement.value = job);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submittingFormCallback);
  }
}