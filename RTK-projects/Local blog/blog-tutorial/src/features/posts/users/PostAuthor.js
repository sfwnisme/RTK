import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllusers } from './usersSlice'

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllusers)
  const author = users.find((user) => user.id === userId)
  return (
    <span>
      {
        author ? author.name : "Unknown User"
      }
    </span>
  )
}

export default PostAuthor