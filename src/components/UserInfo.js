export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      username: this._nameElement.textContent,
      job: this._jobElement.textContent,
      id: this._id
    }
  }

  setUserInfo({ username, job, avatarLink, id }) {
    this._nameElement.textContent = username;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatarLink;
    this._id = id;
  }
}