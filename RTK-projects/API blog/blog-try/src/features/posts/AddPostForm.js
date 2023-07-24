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

  const dispatch = useDispatch()
  const onSavePostClicked = (e) => {
    e.preventDefault()

    dispatch(addNewPost({ title, body: content, userId }))

    // console.log('form values =>', 'title:', title, 'content:', content, 'userId:', userId)

    setTitle('')
    setContent('')
    setUserId('')
  }

  const users = useSelector(selectAllUsers)

  const usersOption = users.map((user) =>
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  )


  return (
    <div>
      <form onSubmit={onSavePostClicked}>
        <label>title</label>
        <input type='text' value={title} onChange={onTitleChange} />
        <label>user</label>
        <select onChange={onAuthorChange}>
          <option></option>
          {usersOption}
        </select>
        <label>Content</label>
        <input type='text' value={content} onChange={onContentChange} />
        <button type='button' onClick={onSavePostClicked}>Create Post</button>
      </form>
    </div>
  )
}

export default AddPostForm