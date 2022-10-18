import React from "react";

function ImagePopup (props) {
  return (
    <div className={`popup popup_type_image ${props.card.state ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose} aria-label="Закрыть форму"></button>
        <form className="popup__form-picture" method="post" name="picture-form">
          <img className="popup__picture-link" src={props.card.src} alt={props.card.alt}/>
          <h2 className="popup__picture-name">{props.card.alt}</h2>
        </form>
      </div>
    </div>
  );
}

export default ImagePopup;