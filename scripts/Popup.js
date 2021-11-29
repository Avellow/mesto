//отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-button');
  }

  _handleEscClose = (evt) => {
    (evt.key === "Escape") && this.close.apply(this);
  }

  _handleOverlayClose = (evt) => {
    evt.target.classList.contains('popup_opened') && this.close();
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this._popupElement.focus();
    this.setEventListeners();
  }

  close = () => {
    this._popupElement.classList.remove('popup_opened');
    this._popupElement.removeEventListener('keydown', this._handleEscClose);
    this._popupCloseBtn.removeEventListener('click', this.close);
    this._popupElement.removeEventListener('click', this._handleOverlayClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('keydown', this._handleEscClose);
    this._popupCloseBtn.addEventListener('click', this.close);
    this._popupElement.addEventListener('click', this._handleOverlayClose);
  }
}