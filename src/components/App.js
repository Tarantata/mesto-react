import React from "react";
import {useEffect, useState} from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
  });

  /* данные профиля с сервера */
    useEffect(() => {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err))
    }, []);

  /* массив объектов карточек с сервера */
    useEffect(() => {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch(err => console.error(err))
        // .finally(() => setIsLoading(false));
    }, []);

  /* отправка карточки на сервер */
    function handleAddPlaceSubmit(cardData) {
      setIsLoading(!isLoading);
      api
        .createNewCard(cardData)
        .then((data) => {
          setIsLoading(!isLoading);
          setCards([data, ...cards]);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }

  /* отправка данных для лайка карточки */
    function handleCardLike(card) {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);
      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
         })
        .catch((err) => console.error(err));
    }

  /* отправка данных для удаления карточки */
    function handleCardDelete(card) {
      setIsLoading(!isLoading);
      api
        .deleteCard(card._id)
        .then(() => {
          setIsLoading(!isLoading);
          const newCard = cards.filter((item) => item._id !== card._id);
          setCards(newCard);
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }

  /* отправка данных для изменения профиля */
  function handleUpdateUser(userData) {
    setIsLoading(!isLoading);
    api
      .updateProfile(userData)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }

 /* отправка данных для изменения аватара */
  function handleUpdateAvatar(avatarData) {
    // setIsLoading(!isLoading);
    api
      .getAvatarInfo(avatarData)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
    }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick(selectedCard) {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(selectedCard);
    console.log(selectedCard)
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick = {handleCardClick}
          cards = {cards}
          handleCardLike = {handleCardLike}
          handleCardDelete = {handleCardDelete}
        />
        <Footer />

        {/* Попап редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Попап добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Попап удаления карточки */}
        <PopupWithForm name="confirm-form" title="Вы уверены?">
            <button className="popup__button"  type="submit" aria-label="Сохранить изменения">Да</button>
        </PopupWithForm>

        {/* Попап полноразмерной карточки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
