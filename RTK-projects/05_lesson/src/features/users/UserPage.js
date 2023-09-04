import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'

const UserPage = () => {
  const { userId } = useParams()

  const user = useSelector((state) => selectUserById(state, +userId))

  const postsForUser = useSelector(selectAllPosts)
  const userPosts = postsForUser.filter((post) => post.userId === user.id)

  const postTitles = userPosts.map((post) => <li><Link to={`/post/${post.id}`}>{post.title}</Link></li>)


  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {postTitles}
      </ul>
    </div>
  )
}

export default UserPage