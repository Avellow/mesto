import { openPopup } from "./index.js";

const popupImgElement = document.querySelector('.img-popup'); //попап с картинкой нажатой карточки
const imgElement = popupImgElement.querySelector('.popup__img'); //картинка в попапе
const imgTitleElement = popupImgElement.querySelector('.popup__img-subtitle'); //подпись к картинке

export class Card {
  constructor( data, cardSelector ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
  }

  _handleOpenImgPopup = () => {
    openPopup(popupImgElement);
    imgElement.src = this._link;
    imgElement.alt = this._name;
    imgTitleElement.textContent = this._name;
  }

  _handleRemoveCard(evt) {
    evt.target.closest('.place').remove();
  }

  _handleChangeLikeState(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', this._handleOpenImgPopup);
    this._removeBtnElement.addEventListener('click', this._handleRemoveCard);
    this._likeBtnElement.addEventListener('click', this._handleChangeLikeState);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._imgElement = this._cardElement.querySelector('.place__img');
    this._removeBtnElement = this._cardElement.querySelector('.place__remove-button');
    this._likeBtnElement = this._cardElement.querySelector('.place__like-button');

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._cardElement.querySelector('.place__name').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}