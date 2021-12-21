import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profileEditBtn,
  cardsAddBtn,
  formProps,
  userInfoSelectors,
  avatarOverlayElement
} from "../utils/constants.js";

//валидация форм
const editFormValidator = new FormValidator(formProps, '.edit-form');
const addFormValidator = new FormValidator(formProps, '.add-form');
const avatarLinkFormValidator = new FormValidator(formProps, '.edit-avatar-form');
avatarLinkFormValidator.enableValidation();
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//функционал профиля
const userInfo = new UserInfo(userInfoSelectors);

//работа с Api
const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1',
  token: '56783857-c2a8-4fa7-a04b-c7f5824d8c44',
  groupId: 'cohort-32'
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{ name, about, avatar, _id }, cards]) => {
    const userData = {
      username: name,
      job: about,
      avatarLink: avatar,
      id: _id
    }
    userInfo.setUserInfo(userData);
    placesSection.renderItems(cards);
  })
  .catch(err => console.log(err));

//секция карточек

const cardConfig = {
  cardSelector: '.place-blank',
  handleCardClick: function(evt) {
    const cardData = {
      link: evt.target.src,
      title: evt.target.alt
    };
    popupWithImage.open(cardData);
  },
  handleConfirmDelete: function(evt) {
    const currentCardElement = evt.target.closest('.place');
    confirmRemoveCardPopup.open(currentCardElement);
    confirmRemoveCardPopup.setElementId(currentCardElement.id);
  },
}

function createCard(data, user, config) {
  const card = new Card(data, user, config);

  card.setLikeReaction(function(evt) {
    if (!card.isLiked(evt.target)) {
      api.likeCard(card.getId())
        .then(({ likes }) => {
          card.setLikes(likes);
          card.changeLikeStatus(evt.target);
        })
        .catch((err) => console.log(`${err} не удалось поставить лайк`))
    } else {
      api.dislikeCard(card.getId())
        .then(({ likes }) => {
          card.setLikes(likes);
          card.changeLikeStatus(evt.target);
        })
        .catch((err) => console.log(`${err} не удалось убрать лайк`))
    }
  })

  return card.generateCard();
}

const placesSection = new Section({
  renderer: (item, position = 'end') => {
    const cardElement = createCard(item, userInfo.getUserInfo(), cardConfig);
    placesSection.addItem(cardElement, position);
  },
}, '.places__list');

//функционал попапа изменения профиля
const profileEditPopupForm = new PopupWithForm(handleSubmitEditForm, '.popup-edit');

function handleSubmitEditForm(data) {
  profileEditPopupForm.changeStatus(true);
  api.postUserInfo(data)
    .then(({ name, about, avatar, _id }) => {
      const userData = {
        username: name,
        job: about,
        avatarLink: avatar,
        id: _id
      }
      userInfo.setUserInfo(userData);
      profileEditPopupForm.close();
      profileEditPopupForm.changeStatus(false);
    })
    .catch(err => console.log(`${err} не удалось изменить профиль`));
}

profileEditBtn.addEventListener('click', () => {
  profileEditPopupForm.setInputUserValues(userInfo.getUserInfo());
  profileEditPopupForm.open();
  editFormValidator.resetValidation();
});

//функционал попапа добавления карточки
const addCardPopupForm = new PopupWithForm(handleSubmitAddForm, '.popup-add');

function handleSubmitAddForm(data) {
  addCardPopupForm.changeStatus(true);
  api.postNewCard(data)
    .then(cardInfo => {
      placesSection.renderItem(cardInfo);
      addCardPopupForm.close();
      addCardPopupForm.changeStatus(false);
    })
    .catch(err => console.log(`${err} не удалось создать карточку`));
}

cardsAddBtn.addEventListener('click', () => {
  addCardPopupForm.open();
  addFormValidator.resetValidation();
})

//функционал попапа с картинкой
const popupWithImage = new PopupWithImage('.img-popup');

//функционал попапа с подтверждением действия
const confirmRemoveCardPopup = new PopupWithConfirmation(handleSubmitRemoveCard, '.confirm-popup');

function handleSubmitRemoveCard(id) {
  api.deleteCardFromServer(id)
    .then(() => {
      confirmRemoveCardPopup.deleteCurrentElement();
      confirmRemoveCardPopup.close();
    })
    .catch(err => console.log(`${err} не удалось удалить карточку`));
}

//функционал попапа изменения аватара
const avatarUpdatePopup = new PopupWithForm(handleSaveAvatar, '.update-avatar-popup')

function handleSaveAvatar({ avatar }) {
  avatarUpdatePopup.changeStatus(true);

  api.updateAvatar(avatar)
    .then(({ name, about, avatar, _id }) => {
      const userData = {
        username: name,
        job: about,
        avatarLink: avatar,
        id: _id
      }
      userInfo.setUserInfo(userData);
      avatarUpdatePopup.close();
      avatarUpdatePopup.changeStatus(false);
    })
    .catch(err => console.log(err));
}

avatarOverlayElement.addEventListener('click', () => {
  avatarUpdatePopup.open();
  avatarLinkFormValidator.resetValidation();
})