import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onAuthorChange = (e) => setUserId(e.target.value)

  const users = useSelector(selectAllUsers)
  const userOptions = users.map((user) => <option value={user.id} id={user.id} key={user.id}>{user.name}</option>)

  const dispatch = useDispatch()

  const onSavePostclicked = (e) => {
    e.preventDefault()

    dispatch(addNewPost({ title, body: content, userId }))

    setTitle('')
    setContent('')
    setUserId('')
  }

  return (
    <form onSubmit={onSavePostclicked}>
      <input type='text' value={title} onChange={onTitleChange} />
      <select onChange={onAuthorChange}>
        <option></option>
        {userOptions}
      </select>
      <input type='text' value={content} onChange={onContentChange} />
      <button type='button' onClick={onSavePostclicked}>Save Post</button>
    </form>
  )
}

export default AddPostForm