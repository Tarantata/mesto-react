import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({src: '#', alt: '#', state: false});

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (props) => {
      setSelectedCard({
          alt: props.name,
          src: props.link,
          state: true
      });
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({src: '#', alt: '#', state: false});
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />
      <Footer />

      <PopupWithForm name="person" title="Редактировать профиль" buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
          <label className="popup__label">
              <input type="text" className="form__input popup__input popup__input_person-name" name="name" defaultValue=""
                     placeholder="Имя" minLength="2" maxLength="40" required autoComplete="off" />
              <span id="person-error" className="error name-error"></span>
          </label>
          <label className="popup__label">
              <input type="text" className="form__input popup__input popup__input_person-profession" name="about"
                     defaultValue="" placeholder="О себе" minLength="2" maxLength="200" required autoComplete="off" />
              <span id="profession-error" className="error about-error"></span>
          </label>
      </PopupWithForm>

      <PopupWithForm name="card" title="Новое место" buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
          <label className="popup__label">
              <input type="text" className="form__input popup__input popup__input_place-name" name="name" defaultValue=""
                     placeholder="Название" minLength="2" maxLength="30" required autoComplete="off" />
              <span id="name-error" className="error name-error"></span>
          </label>
          <label className="popup__label">
              <input type="url" className="form__input popup__input popup__input_place-link" name="link" defaultValue=""
                     placeholder="Ссылка на картинку" required autoComplete="off" />
              <span id="link-error" className="error link-error"></span>
          </label>
          </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
          <label className="popup__label">
              <input type="text" className="form__input popup__input popup__input_avatar-name" name="avatar"
                     defaultValue="" placeholder="Ссылка на аватар" minLength="2" maxLength="200" required
                     autoComplete="off" />
              <span id="avatar-error" className="error avatar-error"></span>
          </label>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

    </div>
  );
}

export default App;
