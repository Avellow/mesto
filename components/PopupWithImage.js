import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElement = this._popupElement.querySelector('.popup__img');
    this._imgTitleElement = this._popupElement.querySelector('.popup__img-subtitle');
  }

  _setImageData(link, title) {
    this._imgElement.src = link;
    this._imgTitleElement.textContent = title;
  }

  open({ link, title }) {
    this._setImageData(link, title);
    super.open();
  }
}