//отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-button');
  }

  _handleEscClose = (evt) => {
    (evt.key === "Escape") && this.close();
  }
  _handleBtnClose = () => {
    this.close();
  }
  _handleOverlayClose = (evt) => {
    evt.target.classList.contains('popup_opened') && this.close();
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._popupElement.focus();
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    this._popupElement.addEventListener('keydown', this._handleEscClose);
    this._popupCloseBtn.addEventListener('click', this._handleBtnClose);
    this._popupElement.addEventListener('click', this._handleOverlayClose);
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener('keydown', this._handleEscClose);
    this._popupCloseBtn.removeEventListener('click', this._handleBtnClose);
    this._popupElement.removeEventListener('click', this._handleOverlayClose);
  }
}