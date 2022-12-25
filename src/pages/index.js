import './index.css'; // добавили импорт главного файла стилей 


import FormValidator from '../scripts/components/FormValidator.js';
import Card from '../scripts/components/Card.js';
import {
  popupEdit,
  popupAdd,
  nameInput,
  jobInput,
  profileTitle,
  profileJob,
  profileEditButton,
  profileAddButton,
  cardTemplate,
  validationConfig,
  popupImageInfo,
  popupFigcaptionImage,
  popupProfileAvatar,
  avatarProfile,
  avatarProfileEdit,
  apiConfig,
  popupAddButton,
  popupEditButton,
  popupProfileAvatarButton,
  userId
} from '../scripts/utils/constans.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';


// создание экземляров класса валидации для формы редактирования и добавления карточки
const validationProfilePopup = new FormValidator(popupEdit, validationConfig);
const validationPlacePopup = new FormValidator(popupAdd, validationConfig);
const validationProfileAvatarPopup = new FormValidator(popupProfileAvatar, validationConfig);

validationPlacePopup.enableValidation();
validationProfilePopup.enableValidation();
validationProfileAvatarPopup.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image', popupImageInfo,
  popupFigcaptionImage);

const popupWithSubmit = new PopupWithForm({
  handleFormSubmit: () => {}
}, '.popup_type_delete');

// создаем Api из шаблона
const api = new Api(
  apiConfig
);


const userInfo = new UserInfo({
  profileTitle,
  profileJob,
  avatarProfile,
  userId
});


api.getAllPromise().then(data => {
  const [getProfileInfo,
    getInitialCards
  ] = data;

  // подгружаем данные профиля
  userInfo.setUserInfo(getProfileInfo);

  //передача параметров и создание экземпляра класса
  const section = new Section({
    items: getInitialCards,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    }
  }, '.elements__container');

  //вызов метода класса Section
  section.renderItems();

  return section
}).then((section) => {
  // Добавляем новую карточку
  const popupWithFormAdd = new PopupWithForm({
    handleFormSubmit: (unputValues) => {
      popupAddButton.textContent = 'Сохранение...'
      // получаем колбэком данные из инпутов
      api.postNewCard(unputValues)
        .then((data) => {
          section.addItem(createCard(data));
          popupWithFormAdd.close();
        })
        .catch(err => {
          return console.log(err)
        }).finally(() => {
          // возвращяем дефолтное значение кнопки добавить карточку
          popupAddButton.textContent = 'Создать';
        })
    }
  }, '.popup_type_add')

  // функция открытия попапа добавления места
  function openPlacePopup() {
    validationPlacePopup.resetForm();

    popupWithFormAdd.open();
  }

  // слушатель на клик открытие попапа добавления места
  profileAddButton.addEventListener('click', () => {
    openPlacePopup();
  })
}).catch((err) => {
  return console.log(err)
})



// отправляем данные профиля на сервер и после подставляем в профиль
const popupWithFormEdit = new PopupWithForm({
  // получаем колбэком данные из инпутов
  handleFormSubmit: (unputValues) => {
    popupEditButton.textContent = 'Сохранение...'
    // подставляем данные в профиль на сервере
    api.patchProfileInfo(unputValues)
      .then((profileInfo) => {
        userInfo.setUserInfo(profileInfo);
        popupWithFormEdit.close();
      })
      .catch(err => {
        return console.log(err)
      })
        .finally(() => {
        // возвращяем дефолтное имя кнопки
        popupEditButton.textContent = 'Сохранить'
      })
  }
}, '.popup_type_edit')


// создание экземпляра класса карточки
const createCard = (item) => {
  const cardItem = new Card(item, cardTemplate, {
    // обработчик клика на карточку
    handleCardClick: (place, url) => {
      popupWithImage.open(place, url);
    },
    // обработчик лайка карточки
    handleLikeClick: (id) => {
      // логика проверки стоит ли лайк у карточки
      if (cardItem.isLiked()) {
        api.deleteCardLike(id).then((res) => {
            cardItem.setLikesCard(res.likes);
          })
          .catch(err => {
            return console.log(err)
          })
      } else {
        api.putCardLike(id).then((res) => {
            cardItem.setLikesCard(res.likes);
          })
          .catch(err => {
            return console.log(err)
          })
      }
    },
    // обработчик клика на удаление карточки
    handleDeleteIconClick: (id) => {

      popupWithSubmit.open();
      popupWithSubmit.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then((res => {
            cardItem.deleteCard();
            popupWithSubmit.close();
          }))
          .catch(err => {
            return console.log(err)
          })
      })
    }
  }, userInfo.userId);
  // генерируем и возвращяем новую карточку
  return cardItem.generateCard();
}


//меняем аватарку и подгружаем новую с сервера
const popupAvatar = new PopupWithForm({
    handleFormSubmit: (unputValues) => {
      popupProfileAvatarButton.textContent = 'Сохранение...';
      api.patchAvatarProfile(unputValues.link)
        .then((data) => {

          userInfo.setUserInfo(data);
          popupAvatar.close();
        })
        .catch(err => {
          return console.log(err)
        })
        .finally(() => {
          // возвращяем дефолное имя кнопки
          popupProfileAvatarButton.textContent = 'Сохранить'
        })
    }
  },
  '.popup_type_avatar'
)

// открытие попапа при клике на аватар
avatarProfileEdit.addEventListener('click', () => {
  validationProfileAvatarPopup.resetForm();
  popupAvatar.open();
})


// слушатель на клик открытие попапа редактирования
profileEditButton.addEventListener('click', () => {
  openProfilePopup();
})

// функция открытия попапа редактирования
function openProfilePopup() {
  //получаем объект с данными профиля
  popupWithFormEdit.setInputValues(userInfo.getUserInfo());
  /*   nameInput.value = profileObject.name;
    jobInput.value = profileObject.about; */

  //сбрасываем валидацию
  validationProfilePopup.resetForm();

  //открываем попап редактирования
  popupWithFormEdit.open();
}