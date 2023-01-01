import Header from "./Header";
import Main from './Main';
import '../pages/index.css';
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";
import api from '../utils/Api.js';

function App() {

    const [isEditProfilePopupOpened, setEditProfilePopupOpened] = useState(false);
    const [isAddPlacePopupOpened, setAddPlacePopupOpened] = useState(false);
    const [isEditAvatarProfilePopupOpened, setEditAvatarProfilePopupOpened] = useState(false);
    const [isDeleteCardPopupOpened, setDeleteCardPopupOpened] = useState(false);
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectorCard] = useState(false);

    useEffect(() => {
        api.getAllPromise().then(data => {
            const [getProfileInfo,
                getInitialCards
            ] = data;
            setUserName(getProfileInfo.name);
            setUserDescription(getProfileInfo.about);
            setUserAvatar(getProfileInfo.avatar);
            setCards(getInitialCards);
        })

    }, []);

    function closeAllPopups(){
        setEditProfilePopupOpened(false);
        setAddPlacePopupOpened(false);
        setEditAvatarProfilePopupOpened(false);
        setDeleteCardPopupOpened(false);
        setSelectorCard(false);
    }
    const handleEditAvatarClick = () => {
        setEditAvatarProfilePopupOpened(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpened(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpened(true);
    }

    const handleDeleteCardClick = () => {
        setDeleteCardPopupOpened(true);
    }

    const handleCardClick = () => {
        setSelectorCard(true);
    }

  return (
      <div className="page" onKeyDown={(evt) => {
        if(evt.key === "Escape") closeAllPopups();
      }}>
        <Header />
        <Main handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleDeleteCardClick={handleDeleteCardClick}
              onCardClick={handleCardClick}
              userName={userName}
              userDescription={userDescription}
              userAvatar={userAvatar}
              cards={cards}
        />
        <Footer />
        <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isEditAvatarProfilePopupOpened} onClose={closeAllPopups} key={'editAvatarProfileKey'} >
            <>
                <input type="url" className="popup__input popup__input_type_url" name="link"
                       id="popup-avatar-link"
                       placeholder="Ссылка на аватар" required />
                <span className="popup__error" id="popup-avatar-link-error"></span>
                <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                        disabled>Сохранить
                </button>
            </>
        </PopupWithForm>
        <PopupWithForm title={'Редактировать профиль'} name={'edit'} isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} key={'editProfileKey'}>
            <>
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
            </>
        </PopupWithForm>
          <PopupWithForm title={'Новое место'} name={'add'} isOpen={isAddPlacePopupOpened} onClose={closeAllPopups} key={'addCardKey'}>
              <>
                  <input type="text" className="popup__input popup__input_type_place" name="name" id="popup-place"
                         placeholder="Название" minLength="2" maxLength="30" required />
                  <span className="popup__error" id="popup-place-error"></span>
                  <input type="url" className="popup__input popup__input_type_url" name="link" id="popup-link"
                         placeholder="Ссылка на картинку" required />
                  <span className="popup__error" id="popup-link-error"></span>
                  <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                          disabled>Создать
                  </button>
              </>
          </PopupWithForm>
          <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={isDeleteCardPopupOpened} onClose={closeAllPopups} key={'deleteCardKey'}>
              <button className="popup__save-btn popup__save-btn_inactive" type="submit"
                      disabled>Да
              </button>
          </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
  )
}

export default App;
