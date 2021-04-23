import { useSelector } from "react-redux";
import "./style.scss";
import UsersTable from "../../components/UsersTable";
import ErrorPage from "../../components/ErrorPage/Index.js";

function Users() {
  const users = useSelector(state => state.users);
  if (users.status === "error") return <ErrorPage />;
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
