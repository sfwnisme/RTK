import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'

const UserBox = ({ userId }) => {
  const users = useSelector(selectAllUsers)
  const author = users.find((user) => user.id == userId)
  return (
    <mark>{author ? author.name : 'Unknown'}</mark>
  )
}

export default UserBox