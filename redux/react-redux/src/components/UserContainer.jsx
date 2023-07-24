import React, { useEffect } from "react";
import { fetchUsers } from "../redux/user/userActions";
import { connect } from "react-redux";

const UserContainer = ({ fetchUsers, usersData }) => {
  useEffect(() => {
    fetchUsers();
  }, []);
  return usersData.loading ? (
    <h2>loading......</h2>
  ) : usersData.error ? (
    <p>{usersData.error}</p>
  ) : (
    <div>
      <h1>Users</h1>
      <div>
        {usersData &&
          usersData.data &&
          usersData.data.map((user) => <p key={user.id}>{user.name}</p>)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersData: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
