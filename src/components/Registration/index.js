import { useState } from "react";
import "./style.scss";
import Modal from "../Modal/index";
import { registration } from "../../queries/index";
import { useForm } from "react-hook-form";

function Registration() {
  const [message, setMessage] = useState("");
  const [isShowModal, setIsShowModal] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    Promise.resolve(registration(data.email, data.password))
      .then(() => {
        setMessage("Регистрация прошла успешно");
      })
      .catch(() => {
        setMessage("Ошибка! Введите пользователя из reqres.in API");
      })
      .finally(() => {
        toggleModal();
      });
  };

  function toggleModal() {
    setIsShowModal(!isShowModal);
  }
  return (
    <div className="container">
      <form className="registration" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="registration__title">Регистрация</h1>
        <input
          type="email"
          placeholder="email"
          id="email"
          className={`registration__email ${
            errors.email ? "registration__error" : ""
          }`}
          {...register("email", { required: true, min: 3 })}
        />
        <input
          type="password"
          className={`registration__password ${
            errors.password ? "registration__error" : ""
          }`}
          placeholder="Пароль"
          id="password"
          {...register("password", { required: true, min: 6 })}
        />
        <input
          type="password"
          className={`registration__password-repeat ${
            errors.password_repeat ? "registration__error" : ""
          }`}
          placeholder="Повторите пароль"
          id="passwordRepeat"
          {...register("password_repeat", { required: true, min: 6 })}
        />

        <input type="submit" className="registration__submit" />
      </form>
      {isShowModal && (
        <Modal modalCloseFoo={toggleModal}>
          <div className="registration-message">
            <p>{message}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Registration;
