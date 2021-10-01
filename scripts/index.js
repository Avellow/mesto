//стараюсь делать аккуратно на будущее, тк на брифе сказали что с этим проектом надолго
//Найду необходимые элементы
const formElement = document.querySelector('.form'); //форма
const nameInput = formElement.querySelector('#name'); // элемент формы "ввод имени"
const jobInput = formElement.querySelector('#about'); //элемент формы "ввод работы"

const profileElement = document.querySelector('.profile'); //элемент профиль
const profileNameElement = profileElement.querySelector('.profile__name'); // элемент содержащий имя профиля
const profileJobElement = profileElement.querySelector('.profile__job'); // элемент содержащий место работы профиля
const profileEditBtn = profileElement.querySelector('.profile__edit-button'); //кнопка изменения профиля

const popupElement = document.querySelector('.popup'); //элемент попап
const popupCloseBtn = popupElement.querySelector('.popup__close'); //кнопка закрытия попапа

//напишу необходимые функции
function openPopup() {                           //функция открывающая попап
  popupElement.classList.add('popup__opened');
}
function closePopup() {                          //функция закрывающая попап
  popupElement.classList.remove('popup__opened');
}

function getProfileName() {                     //функция возвращающая текущее имя профия
  return profileNameElement.textContent;
}
function getProfileJob() {                          //функция возвращающая текущую работу профиля
  return profileJobElement.textContent;
}
function postProfileName(name) {                  //функция устанавливает переданное имя профилю
  profileNameElement.textContent = name;
}
function postProfileJob(job) {                  //функция устанавливает переданное место работы профилю
  profileJobElement.textContent = job;
}

function profileEditHandler() {               //функция хендлер сработающая при нажатии на кнопку edit
  openPopup();
  nameInput.value = getProfileName();
  jobInput.value = getProfileJob();
}
function formSubmitHandler(evt) {           // функция хендлер сработающая при сохранении формы
  evt.preventDefault();
  let newProfileName = nameInput.value;
  let newProfileJob = jobInput.value;
  postProfileName(newProfileName);
  postProfileJob(newProfileJob);
  closePopup();
}

//реализую функционал кнопок через event listener
profileEditBtn.addEventListener('click', profileEditHandler);
popupCloseBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);


//отсалось реализовать лайки через изменения картинки бекграунда
//а сами лайки сделать через button с бекграундом картинки лайка