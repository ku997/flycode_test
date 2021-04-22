import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import UsersTable from "../../components/UsersTable";
import { getUsers } from "../../actions/users/getUsers";
import Preloader from "../../components/Preloader/index";
import ErrorPage from "../../components/ErrorPage/Index.js";

function Users(props) {
  const allUsers = useSelector(state => state.users.loadedUsers);
  const usersStatus = useSelector(state => state.users.status);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [allUsers]);

  if (!usersStatus === "loading") return <Preloader />;
  if (usersStatus === "error") return <ErrorPage />;
  return (
    <div className="users">
      <div className="container">
        <div className="users__inner">
          <h1>Пользователи</h1>
          <UsersTable />
        </div>
      </div>
    </div>
  );
}

export default Users;
