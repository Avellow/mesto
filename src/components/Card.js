export class Card {
  constructor( { name, link }, cardSelector, handleCardClick ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
  }

  _handleRemoveCard(evt) {
    evt.target.closest('.place').remove();
  }

  _handleChangeLikeState(evt) {
    evt.target.classList.toggle('place__like-button_active');
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', this._handleCardClick);
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