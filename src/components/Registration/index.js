import { Component } from 'react';
import './style.scss';
import Modal from '../Modal/index'
import { registration } from '../../queries/index'

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRepeat: '',
            error: '',
            message: '',
            isShowModal: false

        }
        this.registrationSubmit = this.registrationSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.registrationSubmit = this.registrationSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }
    validate() {
        let error = '';
        if (this.state.email.trim() < 1) {
            error = 'Введите email';
        } else if (this.state.password.trim() < 1) {
            error = 'Введите пароль'
        } else if (this.state.password !== this.state.passwordRepeat) {
            error = 'Пароли должны совпадать';
        } else {
            error = '';
        }
        this.setState({
            error
        })
        return error;
    }
    handleInputChange(field, el) {
        this.setState({
            [field]: el.target.value,
        });
    }
    toggleModal() {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }
    registrationSubmit(event) {
        event.preventDefault();
        if (this.validate() === '') {
            Promise.resolve(registration(this.state.email, this.state.password))
                .then(() => {
                    this.setState({
                        message: 'Регистрация прошла успешно'
                    })
                })
                .catch(() => {
                    this.setState({
                        message: 'Ошибка! Введите пользователя из reqres.in API'
                    })
                })
                .finally(() => {
                    this.setState({
                        email: '',
                        password: '',
                        passwordRepeat: '',
                    })
                    this.toggleModal()
                })
        }

    }
    render() {
        return (
            <div className="container">
                <form className="registration">
                    <h1 className='registration__title'>Регистрация</h1>
                    <input value={this.state.email} placeholder='email' onChange={this.handleInputChange.bind(this, 'email')} className='registration__email' type="email" />
                    <input value={this.state.password} placeholder='Пароль' onChange={this.handleInputChange.bind(this, 'password')} className='registration__password' type="password" name="" id="password" />
                    <input value={this.state.passwordRepeat} placeholder='Повторите пароль' onChange={this.handleInputChange.bind(this, 'passwordRepeat')} className='registration__password-repeat' type="password" name="" id="passwordRepeat" />
                    <p className='registration__error'>{this.state.error}</p>
                    <button onClick={this.registrationSubmit} className='registration__submit'>Ок</button>
                </form>
                {this.state.isShowModal && <Modal modalCloseFoo={this.toggleModal}>
                    <div className="registration-message">
                        <p>{this.state.message}</p>
                    </div>
                </Modal>}
            </div>

        );
    }
}
export default Registration;