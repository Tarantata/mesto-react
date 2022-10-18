import React from "react";
import api from "../utils/Api";
import Card from "./Card";
// import CurrentUserContext from "../contexts/CurrentUserContext";
// import Header from "./Header";

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
        .then((data) => {
          setUserName(data.name);
          setUserDescription(data.about);
          setUserAvatar(data.avatar);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [])

  React.useEffect(() => {
    api
      .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch(err => {
          console.error(err);
        });
  }, [])

  return (
    <main className="core">
      <section className="profile">
        <div className="profile__avatar-picture" onClick={props.onEditAvatar}>
          <img src={userAvatar} className="profile__avatar" alt="логотип сайта Место"/>
        </div>
          <h1 className="profile__title">{userName}</h1>
          <p className="profile__subtitle">{userDescription}</p>
          <button className="profile__edit" type="button" onClick={props.onEditProfile} />
          <button className="profile__add" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="places">
        <ul className="content">
          {cards.map((data) =>
            <Card link={data.link} name={data.name} likes={data.likes}
            onCardClick={props.onCardClick} key={data._id}/>)}

        </ul>
      </section>
    </main>
  );
}

export default Main;