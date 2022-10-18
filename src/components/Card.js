import React from "react";

function Card(props) {
  const handleCardClick = () => {
    props.onCardClick(props);
  }
  return (
    <div>
      <li className="card">
        <button className="card__icon-delete" type="button" aria-label="Кнопка удалить"></button>
        <img className="card__place" src={props.link} alt={props.name}
        onClick={handleCardClick} />
        <div className="card__info">
          <h2 className="card__title">{props.name}</h2>
          <div className="card__likes">
            <button className="card__icon-like" type="button" aria-label="Кнопка лайк"></button>
            <p className="card__like-total">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;