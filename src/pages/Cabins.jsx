import UserTable from "../features/cabins/UserTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
// import UserTableOperations from "../features/cabins/UserTableOperations";

const Users = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        {/* <UserTableOperations /> */}
      </Row>

      <Row>
        <UserTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Users;
