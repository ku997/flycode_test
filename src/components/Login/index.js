import { Component } from "react";
import "./style.scss";
import Modal from "../Modal/index";
import { loginUser } from "../../actions/users/loginUser";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      message: "",
      isShowModal: false,
    };
    this.loginSubmit = this.loginSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate() {
    let error = "";
    if (this.state.email.trim() < 1) {
      error = "Введите email";
    } else if (this.state.password.trim() < 1) {
      error = "Введите пароль";
    } else {
      error = "";
    }
    this.setState({
      error,
    });
    return error;
  }
  handleInputChange(field, el) {
    this.setState({
      [field]: el.target.value,
    });
  }
  toggleModal() {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  }
  loginSubmit(event) {
    event.preventDefault();
    if (this.validate() === "") {
      this.setState({
        email: "",
        password: "",
      });
      this.props.loginUser(this.state.email, this.state.password);
    }
    
  }
  render() {
    return (
      <div className="container">
        <form className="login">
          <h1 className="login__title">Вход</h1>
          <input
            value={this.state.email}
            placeholder="email"
            onChange={this.handleInputChange.bind(this, "email")}
            className="login__email"
            type="email"
          />
          <input
            value={this.state.password}
            placeholder="Пароль"
            onChange={this.handleInputChange.bind(this, "password")}
            className="login__password"
            type="password"
            name=""
            id="password"
          />
          <p className="login__error">{this.state.error}</p>
          <button
            onClick={this.loginSubmit}
            className="login__submit">
            Ок
          </button>
        </form>
        {this.state.isShowModal && (
          <Modal modalCloseFoo={this.toggleModal}>
            <div className="login-message">
              <p>{this.state.message}</p>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

const mapDispathToProps = {
  loginUser,
};
export default connect(null, mapDispathToProps)(Login);
