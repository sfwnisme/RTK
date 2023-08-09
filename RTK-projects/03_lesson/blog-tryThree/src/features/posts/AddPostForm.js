import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'
import axios from 'axios'

const AddPostForm = () => {

  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState('')

  const handleTitle = (e) => setTitle(e.target.value)
  const handleBody = (e) => setBody(e.target.value)
  const handleAuthor = (e) => setUserId(e.target.value)

  const userOption = users.map((user) => (
    <option value={user.id} key={user.id} >{user.name}</option>
  ))

  const dispatch = useDispatch()

  // const onSavePost = () => {

  //   dispatch(addNewPost({ title, body, userId }))
  //   console.log('done upload post')

  //   setTitle('')
  //   setBody('')
  //   setUserId('')
  // }

  const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

  const onSavePost = async () => {

    const newPost = {
      title,
      body,
      userId
    }

    const response = await axios.post(POSTS_URL, JSON.stringify({
      title,
      body,
      userId
    }))

    response.status === 200 ? console.log("success") : console.log('failed')

    // setTitle('')
    // setBody('')
    // setUserId('')
  }

  console.log(title, body, userId)
  return (
    <form>
      <input type='text' name='title' value={title} onChange={handleTitle} />
      <select onChange={handleAuthor} >
        <option></option>
        {userOption}
      </select>
      <input type='text' name='body' value={body} onChange={handleBody} />
      <button type='button' onClick={onSavePost}>Add Post</button>
    </form>
  )
}

export default AddPostForm