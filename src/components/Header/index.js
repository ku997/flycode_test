import { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./style.scss";
const listItems = [
  { key: 0, url: "/posts", text: "Посты" },
  { key: 1, url: "/create_post", text: "Написать пост" },
];
class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header">
        <div className="container">
          <ul className="menu">
            {listItems.map((item) => {
              return (
                <li className="menu__item" key={item.key}>
                  <NavLink
                    exact
                    activeClassName="menu__link--active"
                    className="menu__link"
                    to={item.url}
                    key={item.key}
                  >
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          {this.props.authUser ? <div className="header__auth-user">
            <p>{this.props.authUser}</p>
          </div> :
          <div className="header__enter">
            <NavLink className="header__enter-signin" to='/registration' key={4}>Регистрация</NavLink>
            <span>&nbsp;/&nbsp;</span>
            <NavLink className="header__enter-login" to='/login' key={5}>Вход</NavLink>
          </div>}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.authUser.email,
  };
}
export default connect(mapStateToProps, null)(Header);
