const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//необходимые элементы
const editFormElement = document.querySelector('#edit-form'); //форма для изменения профиля
const addFormElement = document.querySelector('#add-form'); //форма для добавления карточки

const nameInput = editFormElement.querySelector('#name'); // элемент формы "ввод имени"
const jobInput = editFormElement.querySelector('#about'); //элемент формы "ввод работы"

const placeNameInput = addFormElement.querySelector('#place-name'); //элемент ввода названия места
const placeUrlInput = addFormElement.querySelector('#place-url'); //элемент ввода ссылка на фото места

const profileElement = document.querySelector('.profile'); //элемент профиль
const profileNameElement = profileElement.querySelector('.profile__name'); // элемент содержащий имя профиля
const profileJobElement = profileElement.querySelector('.profile__job'); // элемент содержащий место работы профиля
const profileEditBtn = profileElement.querySelector('.profile__edit-button'); //кнопка изменения профиля

const cardsAddBtn = profileElement.querySelector('.profile__add-button'); //кнопка добавления карточки

const placeLikeBtns = document.querySelectorAll('.place__like-button'); // кнопка лайк

const popupEditElement = document.querySelector('#popup-edit'); //элемент попап редактирования профиля
const popupAddElement = document.querySelector('#popup-add'); //элемент попап добавления карточки
const popupCloseBtns = document.querySelectorAll('.popup__close-button'); //кнопка закрытия попапа

const placeBlankElement = document.querySelector('#place-blank').content;

//необходимые функции и обработчики
function openPopup(el) {                           //функция открывающая попап
  el.classList.add('popup_opened');
}
function closePopup() {                                                 //функция закрывающая попап
  document.querySelector('.popup_opened').classList.remove('popup_opened');   //нашел текущий открытый попап и закрыл его
}

function profileEditHandler() {               //функция хендлер сработающая при нажатии на кнопку edit
  openPopup(popupEditElement);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}
function editFormSubmitHandler(evt) {           // функция хендлер сработающая при сохранении формы
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

function cardsAddHandler() {                //функция хендлер сработающая при нажатии на кнопку +
  openPopup(popupAddElement);
}

//функционал кнопок через event listener
profileEditBtn.addEventListener('click', profileEditHandler);
cardsAddBtn.addEventListener('click', cardsAddHandler);
popupCloseBtns.forEach(popupCloseBtn => popupCloseBtn.addEventListener('click', closePopup));

editFormElement.addEventListener('submit', editFormSubmitHandler);

