import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";

const UserView = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  console.log(users.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <p>user</p>
      <div>
        {/* {users.loading ? (
          <mark>loading....</mark>
        ) : users.error ? (
          <mark>{users.error}</mark>
        ) : (
          users &&
          users.users && (
            <ul>
              {users.users.map((user) => (
                <li>{user}</li>
              ))}
            </ul>
          )
        )} */}
        {users.loading ? <mark>loading...</mark> : null}
        {!users.loading && !users.users && users.error ? (
          <mark>Error: {users.error}</mark>
        ) : null}
        {!users.loading &&
        !users.error &&
        users &&
        users.users &&
        users.users.length ? (
          <ul>
            {users.users.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default UserView;
