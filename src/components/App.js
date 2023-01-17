import Header from "./Header";
import Main from './Main';
import '../pages/index.css';
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";
import api from '../utils/Api';
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

    const [isEditProfilePopupOpened, setEditProfilePopupOpened] = useState(false);
    const [isAddPlacePopupOpened, setAddPlacePopupOpened] = useState(false);
    const [isEditAvatarProfilePopupOpened, setEditAvatarProfilePopupOpened] = useState(false);
    const [isDeleteCardPopupOpened, setDeleteCardPopupOpened] = useState(false);
    /*const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');*/
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectorCard] = useState({isOpen: false});
    const [currentUser, setCurrentUser] = useState({});


    useEffect(() => {
        api.getAllPromise().then(data => {
            const [
                getProfileInfo,
                getInitialCards
            ] = data;
            setCurrentUser(getProfileInfo);
/*            setUserName(getProfileInfo.name);
            setUserDescription(getProfileInfo.about);
            setUserAvatar(getProfileInfo.avatar);*/
            setCards(getInitialCards);
        })

    }, []);

    function handleCardLike(card) {
        console.log(card);
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card){
        api.deleteCard(card._id)
            .then(setCards(state => state.filter(item => item._id === card._id ? null : card)));
    }

    function closeAllPopups(){
        setEditProfilePopupOpened(false);
        setAddPlacePopupOpened(false);
        setEditAvatarProfilePopupOpened(false);
        setDeleteCardPopupOpened(false);
        setSelectorCard({isOpen: false});
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

/*    const handleDeleteCardClick = () => {
        setDeleteCardPopupOpened(true);
    }*/

    const handleCardClick = ({name, link}) => {
        setSelectorCard({isOpen: true, name: name, link: link});
    }

    function handleUpdateUser({name, about}) {
        api.patchProfileInfo({name, about}).then((data)=> {
            setCurrentUser(data);
            closeAllPopups();
        })
    }

    function handleUpdateAvatar({avatar}){
        api.patchAvatarProfile(avatar).then((data)=> {
            setCurrentUser(data);
            closeAllPopups();
        })
    }

    function handleAddPlaceSubmit(name, link){
        api.postNewCard({name, link}).then((newCard) => {
            console.log(newCard);
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page" onKeyDown={(evt) => {
            if(evt.key === "Escape") closeAllPopups();
          }}>
            <Header />
              <Main handleEditAvatarClick={handleEditAvatarClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    //handleDeleteCardClick={handleDeleteCardClick}
                    onCardClick={handleCardClick}
                    //userName={userName}
                    //userDescription={userDescription}
                    //userAvatar={userAvatar}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
              />
            <Footer />
              <EditProfilePopup
                  isOpen={isEditProfilePopupOpened}
                  onClose={closeAllPopups}
                  onSubmit={'edit'}
                  onUpdateUser={handleUpdateUser}/>
              <EditAvatarPopup
                  isOpen={isEditAvatarProfilePopupOpened}
                  onClose={closeAllPopups}
                  onSubmit={'avatar'}
                  onUpdateAvatar={handleUpdateAvatar}
              />
              <AddPlacePopup
                  isOpen={isAddPlacePopupOpened}
                  onClose={closeAllPopups}
                  onSubmit={'add'}
                  onAddPlace={handleAddPlaceSubmit}
              />
{/*            <PopupWithForm title={'Обновить аватар'} name={'avatar'} isOpen={isEditAvatarProfilePopupOpened} onClose={closeAllPopups} textButton={'Сохранить'}>
                <>
                    <input type="url" className="popup__input popup__input_type_url" name="link"
                           id="popup-avatar-link"
                           placeholder="Ссылка на аватар" required />
                    <span className="popup__error" id="popup-avatar-link-error"></span>
                </>
            </PopupWithForm>*/}
{/*            <PopupWithForm title={'Редактировать профиль'} name={'edit'} isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} textButton={'Сохранить'}>
                <>
                    <input type="text" className="popup__input popup__input_type_name" name="name" id="popup-name"
                           placeholder="Имя" minLength="2" maxLength="40" required />
                    <span className="popup__error" id="popup-name-error"></span>
                    <input type="text" className="popup__input popup__input_type_about" name="about"
                           id="popup-job"
                           placeholder="О себе" minLength="2" maxLength="200" required />
                    <span className="popup__error" id="popup-job-error"></span>
                </>
            </PopupWithForm>*/}
{/*              <PopupWithForm title={'Новое место'} name={'add'} isOpen={isAddPlacePopupOpened} onClose={closeAllPopups} textButton={'Создать'}>
                  <>
                      <input type="text" className="popup__input popup__input_type_place" name="name" id="popup-place"
                             placeholder="Название" minLength="2" maxLength="30" required />
                      <span className="popup__error" id="popup-place-error"></span>
                      <input type="url" className="popup__input popup__input_type_url" name="link" id="popup-link"
                             placeholder="Ссылка на картинку" required />
                      <span className="popup__error" id="popup-link-error"></span>
                  </>
              </PopupWithForm>*/}
              <PopupWithForm title={'Вы уверены?'} name={'delete'} isOpen={isDeleteCardPopupOpened} onClose={closeAllPopups} textButton={'Да'}>
              </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </div>
      </CurrentUserContext.Provider>
  )
}

export default App;
