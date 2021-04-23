import { useEffect } from "react";
import { getUsers } from "../../actions/users/getUsers";
import { getFilters } from "../../actions/users/getFilters";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { map } from "lodash";

function UsersTable() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(users.page));
  }, [users.page]);

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
    },
    {
      title: "Имя",
      dataIndex: "first_name",
      key:"first_name",
      filters: map(users.data, user => {
        return { text: user.first_name, value: user.first_name };
      }),
      onFilter: (value, record) => record.first_name.indexOf(value) === 0,
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Фамилия",
      dataIndex: "last_name",
      key: 'last_name',
      filters: map(users.data, user => {
        return { text: user.last_name, value: user.last_name };
      }),
      onFilter: (value, record) => record.last_name.indexOf(value) === 0,
      sorter: (a, b) => a.last_name.length - b.last_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key:'email',
      filterMultiple: false,
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    dispatch(getFilters({ page: pagination.current, filters, sorter, extra }));
  }

  return (
    <Table
      columns={columns}
      dataSource={users.data}
      pagination={{
        total: users.total,
        pageSize: users.per_page,
        current: users.page,
      }}
      loading={users.status === "loading"}
      onChange={onChange}
    />
  );
}

export default UsersTable;
