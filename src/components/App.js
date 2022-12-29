import Header from "./Header";
import Main from './Main';
import '../pages/index.css';
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm";
import {useState} from "react";
function App() {

    const [isEditProfilePopupOpened, setEditProfilePopupOpened] = useState(false);
    const [isAddPlacePopupOpened, setAddPlacePopupOpened] = useState(false);
    const [isEditAvatarProfilePopupOpened, setEditAvatarProfilePopupOpened] = useState(false);
    const closeAllPopups = (evt) => {
        setEditProfilePopupOpened(false);
        setAddPlacePopupOpened(false);
        setEditAvatarProfilePopupOpened(false);
    }
    const handleEditAvatarClick = () => {
        setEditProfilePopupOpened(true);
    }

    const handleEditProfileClick = () => {
        setAddPlacePopupOpened(true);
    }

    const handleAddPlaceClick = () => {
        setEditAvatarProfilePopupOpened(true);
    }
  return (
      <div className="page" onKeyDown={(evt) => {
        if(evt.key === "Escape") closeAllPopups();
      }}>
        <Header />
        <Main handleEditAvatarClick={handleEditAvatarClick}  handleEditProfileClick={handleEditProfileClick} handleAddPlaceClick={handleAddPlaceClick} />
        <Footer />
        <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} />
        <PopupWithForm title={'Редактировать профиль'} name={'edit'} isOpen={isAddPlacePopupOpened} onClose={closeAllPopups} />
          <PopupWithForm title={'Новое место'} name={'add'} isOpen={isEditAvatarProfilePopupOpened} onClose={closeAllPopups} />
          <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={false}/>
        <ImagePopup />
          <template className="cards-template">
              <li className="elements__el">
                  <button className="elements__trash elements__trash_visible" type="button"
                          aria-label="кнопка удаления карточки"></button>
                  <img className="elements__img" alt="Карточка" />
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
