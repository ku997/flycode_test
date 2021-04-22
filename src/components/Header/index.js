import { NavLink } from "react-router-dom";
import "./style.scss";

function Header(props) {
  const listItems = [
    { key: 0, url: "/posts", text: "Посты" },
    { key: 1, url: "/create_post", text: "Написать пост" },
    { key: 2, url: "/users", text: "Пользователи" },
  ];
  return (
    <header className="header">
      <div className="container">
        <ul className="menu">
          {listItems.map(item => {
            return (
              <li className="menu__item" key={item.key}>
                <NavLink
                  exact
                  activeClassName="menu__link--active"
                  className="menu__link"
                  to={item.url}
                  key={item.key}>
                  {item.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
        {props.accessToken === void 0 && (
          <div className="header__enter">
            <NavLink
              className="header__enter-signin"
              to="/registration"
              key={4}>
              Регистрация
            </NavLink>
            <span>&nbsp;/&nbsp;</span>
            <NavLink className="header__enter-login" to="/login" key={5}>
              Вход
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
