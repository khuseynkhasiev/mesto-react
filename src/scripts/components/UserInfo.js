export default class UserInfo {
    constructor(data) {
        this._name = data.profileTitle;
        this._about = data.profileJob;
        this._avatar = data.avatarProfile;
        this.userId = data.userId;
    }
    // возвращяем объект с данными профиля
    getUserInfo = () => {
        const userInfo = {
            name: this._name.textContent,
            about: this._about.textContent
        }
        return userInfo;
    }
    // вставляем данные в профиль
    setUserInfo(inputValues) {
        this._name.textContent = inputValues.name;
        this._about.textContent = inputValues.about;
        this._avatar.src = inputValues.avatar;
        this.userId = inputValues._id;
    }
}