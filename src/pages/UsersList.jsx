import AddUser from "../features/users/AddUser";
import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const UsersList = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        <UserTableOperations />
      </Row>

      <Row>
        <UserTable />
        <AddUser />
      </Row>
    </>
  );
};

export default UsersList;
