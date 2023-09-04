import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectAllUsers } from './usersSlice'

const UsersList = () => {
  const users = useSelector(selectAllUsers)

  const usersList = users.map((user) =>
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  )
  return (
    <div>{usersList}</div>
  )
}

export default UsersList