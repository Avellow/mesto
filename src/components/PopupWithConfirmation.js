import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._handleSubmit = handleSubmit;
  }

  _submittingCallback = (evt) => {
    evt.preventDefault();
    this._handleSubmit(this._elementId);
  }

  setElementId(id) {
    this._elementId = id;
  }

  open(currentElement) {
    super.open();
    this._currentElement = currentElement;
  }

  deleteCurrentElement() {
    this._currentElement.remove();
  }

  close() {
    super.close();
    this._form.removeEventListener('submit', this._submittingCallback);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submittingCallback);
  }
}