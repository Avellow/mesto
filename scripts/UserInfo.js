export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      username: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }
  }

  setUserInfo({ username, job }) {
    console.log()
    this._nameElement.textContent = username;
    this._jobElement.textContent = job;
  }

}