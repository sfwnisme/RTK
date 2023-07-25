import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  const options = users.map((user) => (
    <option key={user.id} value={user.id} >{user.name}</option>
  ))

  const onTitleChange = (e) => setTitle(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onUserChange = (e) => setUserId(e.target.value)


  const handlePost = (e) => {
    e.preventDefault()
    if (title && content) {
      dispatch(
        postAdded(title, content, userId)
      )
    }
  }

  const canSave = Boolean(title) && Boolean(content)

  return (
    <form onSubmit={handlePost}>
      <input type='text' value={title} onChange={onTitleChange} />
      <select onChange={onUserChange}>
        <option></option>
        {options}
      </select>
      <input type='text' value={content} onChange={onContentChange} />
      <button type='button' disabled={!canSave} onClick={handlePost}>Add Post</button>
    </form>
  )
}

export default AddPostForm