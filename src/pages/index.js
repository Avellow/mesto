import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/defaultCards.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditBtn,
  cardsAddBtn,
  formProps,
} from "../utils/constants.js";

//валидация форм
const editFormValidator = new FormValidator(formProps, '.edit-form');
const addFormValidator = new FormValidator(formProps, '.add-form');
editFormValidator.enableValidation();
addFormValidator.enableValidation();

//функционал профиля
const userInfoSelectors = {
  nameSelector: ".profile__name",
  jobSelector: ".profile__job"
}
const userInfo = new UserInfo(userInfoSelectors);

//функционал попапа изменения профиля
function handleSubmitEditForm(data) {
  const newUserInfo = new UserInfo(userInfoSelectors);
  newUserInfo.setUserInfo(data);
  profileEditPopupForm.close();
}

const profileEditPopupForm = new PopupWithForm(handleSubmitEditForm, '.popup-edit');

profileEditBtn.addEventListener('click', () => {
  profileEditPopupForm.setInputUserValues(userInfo.getUserInfo());
  profileEditPopupForm.open();
  editFormValidator.resetValidation();
});

//функционал попапа с картинкой
const popupWithImage = new PopupWithImage('.img-popup');

//функционал карточки и ее добавления
function handleCardClick(evt) {
  const cardData = {
    link: evt.target.src,
    title: evt.target.alt,
  };
  popupWithImage.open(cardData);
}

function handleSubmitAddForm(data) {
  const card = new Card(data, '.place-blank', handleCardClick);
  const cardElement = card.generateCard();
  placesSection.addItem(cardElement, 'start');
  addCardPopupForm.close();
}

const addCardPopupForm = new PopupWithForm(handleSubmitAddForm, '.popup-add');

cardsAddBtn.addEventListener('click', () => {
  addCardPopupForm.open();
  addFormValidator.resetValidation();
})

//секция карточек и рендер стандартных карточек
const placesSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.place-blank', handleCardClick);
    const cardElement = card.generateCard();
    placesSection.addItem(cardElement);
  },
}, '.places__list');

placesSection.renderItems();