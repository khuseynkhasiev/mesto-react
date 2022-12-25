
import './pages/index.css';
function App() {
  return (
      <div className="page">
        <header className="header">
          <div className="header__logo"></div>
        </header>
        <main className="main-content">
          <section className="profile">
            <div className="profile__hover">
              <img src="<%=require('./images/preloader2.gif')%>" alt="Аватарка" className="profile__avatar" />
                <img src="<%=require('./images/avatar__edit-pen.svg')%>" className="profile__edit-pen" />
            </div>
            <div className="profile__info">
              <h1 className="profile__title"></h1>
              <button className="profile__edit-button" type="button" aria-label="кнопка редактирования"></button>
              <p className="profile__job"></p>
            </div>
            <button className="profile__add-button" type="button" aria-label="кнопка добавления"></button>
          </section>
          <section className="elements">
            <ul className="elements__container">
            </ul>
          </section>
        </main>
        <footer className="footer">
          <p className="footer__copyright">&copy; 2023 Mesto Russia</p>
        </footer>
          <div className="popup popup_type_edit">
              <div className="popup__container">
                  <button className="popup__close" type="button" aria-label="кнопка закрытия"></button>
                  <form className="popup__form" name="popup-form-edit" noValidate>
                      <h3 className="popup__title">Редактировать профиль</h3>
                      <input type="text" className="popup__input popup__input_type_name" name="name" id="popup-name"
                             placeholder="Имя" minLength="2" maxLength="40" required />
                          <span className="popup__error" id="popup-name-error"></span>
                          <input type="text" className="popup__input popup__input_type_about" name="about"
                                 id="popup-job"
                                 placeholder="О себе" minLength="2" maxLength="200" required />
                              <span className="popup__error" id="popup-job-error"></span>
                              <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                                      disabled>Сохранить
                              </button>
                  </form>
              </div>
          </div>
          <div className="popup popup_type_add">
              <div className="popup__container">
                  <button className="popup__close" type="button"></button>
                  <form className="popup__form" name="popup-form-add">
                      <h3 className="popup__title">Новое место</h3>
                      <input type="text" className="popup__input popup__input_type_place" name="name" id="popup-place"
                             placeholder="Название" minLength="2" maxLength="30" required />
                          <span className="popup__error" id="popup-place-error"></span>
                          <input type="url" className="popup__input popup__input_type_url" name="link" id="popup-link"
                                 placeholder="Ссылка на картинку" required />
                              <span className="popup__error" id="popup-link-error"></span>
                              <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                                      disabled>Создать
                              </button>
                  </form>
              </div>
          </div>
          <div className="popup popup_type_image popup_opacity">
              <div className="popup__container-image">
                  <figure className="popup__figure">
                      <button className="popup__close" type="button"></button>
                      <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
                           alt="Байкал"
                           className="popup__image" />
                          <figcaption className="popup__figcaption"></figcaption>
                  </figure>
              </div>
          </div>
          <div className="popup popup_type_delete">
              <div className="popup__container">
                  <button className="popup__close" type="button" aria-label="кнопка закрытия"></button>
                  <form className="popup__form" name="popup-form-delete" noValidate>
                      <h3 className="popup__title popup__title_theme_delete">Вы уверены?</h3>
                      <button className="popup__save-btn popup__save-btn_theme_delete" type="submit">Да</button>
                  </form>
              </div>
          </div>
          <div className="popup popup_type_avatar">
              <div className="popup__container">
                  <button className="popup__close" type="button"></button>
                  <form className="popup__form" name="popup-form-add">
                      <h3 className="popup__title">Обновить аватар</h3>
                      <input type="url" className="popup__input popup__input_type_url" name="link"
                             id="popup-avatar-link"
                             placeholder="Ссылка на аватар" required />
                          <span className="popup__error" id="popup-avatar-link-error"></span>
                          <button className="popup__save-btn popup__save-btn_inactive popup__save-btn_theme_avatar"
                                  type="submit"
                                  disabled>Сохранить
                          </button>
                  </form>
              </div>
          </div>
          <template className="cards-template">
              <li className="elements__el">
                  <button className="elements__trash elements__trash_visible" type="button"
                          aria-label="кнопка удаления карточки"></button>
                  <img className="elements__img" />
                      <div className="elements__info">
                          <h2 className="elements__title"></h2>
                          <div className="elements__counter">
                              <button className="elements__like" type="button"
                                      aria-label="кнопка выставления лайка или отмены лайка"></button>
                              <p className="elements__number"></p>
                          </div>
                      </div>
              </li>
          </template>
      </div>
  )
}

export default App;
