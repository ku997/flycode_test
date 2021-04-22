import { useState } from "react";
import "./style.scss";
import Modal from "../Modal/index";
import { login } from "../../queries";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const [message, setMessage] = useState("");
  const [isShowModal, setIsShowModal] = useState("");
  const [cookies, setCookie] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  function toggleModal() {
    setIsShowModal(!isShowModal);
  }
  const onSubmit = data => {
    Promise.resolve(login(data.email, data.password))
      .then(response => {
        setCookie("token", response.data.token, { path: "/" });
        setCookie("userId", "1", { path: "/" });
        history.push("/posts");
      })
      .catch(() => {
        setMessage("Ошибка! Введите пользователя из reqres.in API");
      })
      .finally(() => {
        toggleModal();
      });
  };
  return (
    <div className="container">
      <form className="login" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login__title">Вход</h1>
        <input
          type="email"
          placeholder="email"
          id="email"
          className={`login__email ${errors.email ? "login__error" : ""}`}
          {...register("email", { required: true, min: 3 })}
        />
        <input
          type="password"
          className={`login__password ${errors.password ? "login__error" : ""}`}
          placeholder="Пароль"
          id="password"
          {...register("password", { required: true, min: 6 })}
        />
        <input value="Войти" type="submit" className="login__submit" />
      </form>
      {isShowModal && (
        <Modal modalCloseFoo={toggleModal}>
          <div className="login-message">
            <p>{message}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Login;
