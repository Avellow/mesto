import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./defaultCards.js";

import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

//необходимые элементы
const editFormElement = document.querySelector('.edit-form'); //форма для изменения профиля
const addFormElement = document.querySelector('.add-form'); //форма для добавления карточки

const nameInput = editFormElement.querySelector('.form__input_type_profile-name'); // элемент формы "ввод имени"
const jobInput = editFormElement.querySelector('.form__input_type_profile-job'); //элемент формы "ввод работы"

const placeNameInput = addFormElement.querySelector('.form__input_type_place-name'); //элемент ввода названия места
const placeUrlInput = addFormElement.querySelector('.form__input_type_place-url'); //элемент ввода ссылка на фото места

const profileElement = document.querySelector('.profile'); //элемент профиль
const profileNameElement = profileElement.querySelector('.profile__name'); // элемент содержащий имя профиля
const profileJobElement = profileElement.querySelector('.profile__job'); // элемент содержащий место работы профиля
const profileEditBtn = profileElement.querySelector('.profile__edit-button'); //кнопка изменения профиля

const cardsAddBtn = profileElement.querySelector('.profile__add-button'); //кнопка добавления карточки

const popupEditElement = document.querySelector('.popup-edit'); //элемент попап редактирования профиля
const popupAddElement = document.querySelector('.popup-add'); //элемент попап добавления карточки

const popupCloseBtns = document.querySelectorAll('.popup__close-button'); //кнопка закрытия попапа

const placeListElements = document.querySelector('.places__list');   //список в который вставлять карточки

const formProps = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const editFormValidator = new FormValidator(formProps, editFormElement);
const addFormValidator = new FormValidator(formProps, addFormElement);

//!!!! НОВЫЙ ФУНКЦИОНАЛ !!!!
const userInfoSelectors = {
  nameSelector: ".profile__name",
  jobSelector: ".profile__job"
}

const userInfo = new UserInfo(userInfoSelectors);


// ИСПОЛЬЗУЮ КЛАСС для ОТРИСОВКИ
const placesSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.place-blank');
    const cardElement = card.generateCard();
    placesSection.addItem(cardElement);
  },
}, '.places__list');

placesSection.renderItems();

const addCardPopupForm = new Popup('.popup-add');
cardsAddBtn.addEventListener('click', () => {
  addCardPopupForm.open();
})

const profileEditPopupForm = new PopupWithForm(() => {

}, '.popup-edit');
profileEditBtn.addEventListener('click', () => {
  profileEditPopupForm.open();
});


//!!!! КОНЕЦ НОВОГО ФУНКЦИОНАЛА !!!!

//необходимые функции и обработчики
export function openPopup(el) {                           //функция открывающая попап
  el.classList.add('popup_opened');
  el.focus();
  el.addEventListener('keydown', closePopupByEsc);
  el.addEventListener('mousedown', closePopupByClickingOverlay);
}
function closePopup() {                                                //функция закрывающая попап
  const openedPopup = document.querySelector('.popup_opened');          //нашел текущий открытый попап
  openedPopup && openedPopup.classList.remove('popup_opened');
  openedPopup.removeEventListener('keydown', closePopupByEsc);
  openedPopup.removeEventListener('mousedown', closePopupByClickingOverlay);
}

function closePopupByClickingOverlay(evt) {
  evt.target.classList.contains('popup_opened') && closePopup();
}

function closePopupByEsc(evt) {
  (evt.key === "Escape") && closePopup();
}

function profileEditHandler() {               //функция хендлер сработающая при нажатии на кнопку edit
  openPopup(popupEditElement);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  editFormValidator.resetValidation();
}

function editFormSubmitHandler(evt) {           // функция хендлер сработающая при сохранении формы
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

function cardsAddHandler() {                //функция хендлер сработающая при нажатии на кнопку +
  openPopup(popupAddElement);
  addFormValidator.resetValidation();
}

function addFormSubmitHandler(evt) {        //хендлер по добавлению нового места в список
  evt.preventDefault();
  const data = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  }
  renderCard( data, '.place-blank' );
  placeNameInput.value = '';
  placeUrlInput.value = '';
  closePopup();
}

function createCardElement(data, cardSelector) {
  const card = new Card(data, cardSelector);
  return card.generateCard();
}

function renderCard(data, cardSelector) {
  const cardElement = createCardElement(data, cardSelector);
  placeListElements.prepend(cardElement);
}

/* под удаление, реализовано через класс Section
function renderCards(cards, cardSelector) {
  cards.forEach(data => {
    const cardElement = createCardElement(data, cardSelector);
    placeListElements.append(cardElement);
  });
} */

//функционал кнопок через event listener
//profileEditBtn.addEventListener('click', profileEditHandler);
//cardsAddBtn.addEventListener('click', cardsAddHandler);
//popupCloseBtns.forEach(popupCloseBtn => popupCloseBtn.addEventListener('click', closePopup));

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

//удаление renderCards(initialCards, '.place-blank'); //отрисовывает дефолтные карточки

editFormValidator.enableValidation();
addFormValidator.enableValidation();