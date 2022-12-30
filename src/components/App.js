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
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getAllPromise().then(data => {
            const [getProfileInfo,
                getInitialCards
            ] = data;
            setUserName(getProfileInfo.name);
            setUserDescription(getProfileInfo.about);
            setUserAvatar(getProfileInfo.avatar);
            setCards(getInitialCards);
            console.log(getInitialCards);
        })

    }, []);

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
        <Main handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              userName={userName}
              userDescription={userDescription}
              userAvatar={userAvatar}
              cards={cards}
        />
        <Footer />
        <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} />
        <PopupWithForm title={'Редактировать профиль'} name={'edit'} isOpen={isAddPlacePopupOpened} onClose={closeAllPopups} />
          <PopupWithForm title={'Новое место'} name={'add'} isOpen={isEditAvatarProfilePopupOpened} onClose={closeAllPopups} />
          <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={false}/>
        <ImagePopup />
      </div>
  )
}

export default App;
