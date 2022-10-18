import React from "react";

function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose} aria-label="Закрыть форму"></button>
        <form className={`form popup__form-${props.name}`} method="post" name={`${props.name}-form`} noValidate action="#">
          <div className="align">
            <h2 className={`popup__heading-${props.name}`}>{props.title}</h2>
          </div>      
          {props.children}
        </form>
      </div>
    </div>
 )
}

export default PopupWithForm;