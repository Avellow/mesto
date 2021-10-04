//стараюсь делать аккуратно на будущее, тк на брифе сказали что с этим проектом надолго
//Найду необходимые элементы
const formElement = document.querySelector('.form'); //форма
const nameInput = formElement.querySelector('#name'); // элемент формы "ввод имени"
const jobInput = formElement.querySelector('#about'); //элемент формы "ввод работы"

const profileElement = document.querySelector('.profile'); //элемент профиль
const profileNameElement = profileElement.querySelector('.profile__name'); // элемент содержащий имя профиля
const profileJobElement = profileElement.querySelector('.profile__job'); // элемент содержащий место работы профиля
const profileEditBtn = profileElement.querySelector('.profile__edit-button'); //кнопка изменения профиля

const placeLikeBtns = document.querySelectorAll('.place__like-button'); // кнопка лайк

const popupElement = document.querySelector('.popup'); //элемент попап
const popupCloseBtn = popupElement.querySelector('.popup__close-button'); //кнопка закрытия попапа

//напишу необходимые функции
function openPopup() {                           //функция открывающая попап
  popupElement.classList.add('popup_opened');
}
function closePopup() {                          //функция закрывающая попап
  popupElement.classList.remove('popup_opened');
}

function profileEditHandler() {               //функция хендлер сработающая при нажатии на кнопку edit
  openPopup();
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}
function formSubmitHandler(evt) {           // функция хендлер сработающая при сохранении формы
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  closePopup();
}

//реализую функционал кнопок через event listener
profileEditBtn.addEventListener('click', profileEditHandler);
popupCloseBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

