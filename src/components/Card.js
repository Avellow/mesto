export class Card {
  constructor(data, user, { cardSelector, handleCardClick, handleConfirmDelete }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._userInfo = user;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDelete = handleConfirmDelete;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._imgElement.addEventListener('click', this._handleCardClick);
    this._removeBtnElement.addEventListener('click', this._handleConfirmDelete);
    this._likeBtnElement.addEventListener('click', this._handleLikeReaction);
  }

  _isUserCard() {
    return this._owner._id === this._userInfo.id;
  }

  _setLikesCount() {
    this._likeCounter.textContent = this._likes.length;
  }

  setLikes(likes) {
    this._likes = likes;
    this._setLikesCount();
  }

  setLikeReaction(fn) {
    this._handleLikeReaction = fn;
  }

  changeLikeStatus(el) {
    el.classList.toggle('place__like-button_active')
  }

  getId() {
    return this._id;
  }

  isLiked(el) {
    return el.classList.contains('place__like-button_active');
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.place').id = this._id;
    this._imgElement = this._cardElement.querySelector('.place__img');
    this._removeBtnElement = this._cardElement.querySelector('.place__remove-button');
    this._likeBtnElement = this._cardElement.querySelector('.place__like-button');
    this._likeCounter = this._cardElement.querySelector('.place__like-counter');

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._cardElement.querySelector('.place__name').textContent = this._name;

    if (this._likes.some(like => like._id === this._userInfo.id)) {
      this._likeBtnElement.classList.add('place__like-button_active');
    }

    if (!this._isUserCard()) {
      this._removeBtnElement.remove()
    }
    this._setLikesCount();
    this._setEventListeners();

    return this._cardElement;
  }
}