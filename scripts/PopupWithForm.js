import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputElements = Array.from(this._popupElement.querySelectorAll('.form__input'));
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputElements.forEach(el => {
      this._inputValues[el.name] = el.value;
    })
  }


}