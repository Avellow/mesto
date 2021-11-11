import { Card } from './Card.js';
import { FormValidator } from "./validate.js";
import { initialCards } from "./defaultCards.js";

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
const popupEditSubmitButton = popupEditElement.querySelector('.form__submit');
const popupAddElement = document.querySelector('.popup-add'); //элемент попап добавления карточки
const addingCardButton = popupAddElement.querySelector('.form__submit'); //кнопка добавления карточки

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

//необходимые функции и обработчики
export function openPopup(el) {                           //функция открывающая попап
  el.classList.add('popup_opened');
  el.addEventListener('keydown', closePopupByEsc);
  el.addEventListener('mousedown', closePopupByClickingOverlay);
}
function closePopup() {                                                //функция закрывающая попап
  const openedPopup = document.querySelector('.popup_opened');          //нашел текущий открытый попап
  openedPopup && openedPopup.classList.remove('popup_opened');          //если такой попап !== undefined (т.е. существует), то закрыть его 
  openedPopup.removeEventListener('keydown', closePopupByEsc);
  openedPopup.removeEventListener('click', closePopupByClickingOverlay);
}
function closePopupByClickingOverlay(evt) {
  evt.target.classList.contains('popup_opened') && closePopup();
}
function closePopupByEsc(evt) {
  (evt.key === "Escape") && closePopup();
}

function makeButtonActive(buttonElement) {
  buttonElement.classList.contains('form__submit_inactive') && buttonElement.classList.remove('form__submit_inactive');
  buttonElement.disabled = false;
}
function makeButtonInactive(buttonElement) {
  !buttonElement.classList.contains('form__submit_inactive') && buttonElement.classList.add('form__submit_inactive');
  buttonElement.disabled = true;
}

function hideError(formEl, inputEl) {
  const errorElement = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function profileEditHandler() {               //функция хендлер сработающая при нажатии на кнопку edit
  openPopup(popupEditElement);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  hideError(editFormElement, nameInput);
  hideError(editFormElement, jobInput);
  makeButtonActive(popupEditSubmitButton);
}
function editFormSubmitHandler(evt) {           // функция хендлер сработающая при сохранении формы
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

function addPlaceCard(el) {                                        
  placeListElements.prepend(el);
}

function cardsAddHandler() {                //функция хендлер сработающая при нажатии на кнопку +
  openPopup(popupAddElement);
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
  makeButtonInactive(addingCardButton);
}


function renderCard(data, cardSelector) {
  const card = new Card(data, cardSelector);
  const cardElement = card.generateCard();
  addPlaceCard(cardElement);
}

function renderCards(cards, cardSelector) {
  cards.forEach(data => renderCard(data, cardSelector));
}

//функционал кнопок через event listener
profileEditBtn.addEventListener('click', profileEditHandler);
cardsAddBtn.addEventListener('click', cardsAddHandler);
popupCloseBtns.forEach(popupCloseBtn => popupCloseBtn.addEventListener('click', closePopup));

editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

renderCards(initialCards, '.place-blank'); //отрисовывает дефолтные карточки

editFormValidator.enableValidation();
addFormValidator.enableValidation();