import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded, selectAllPosts } from './postsSlice'
import { selectAllusers } from './users/usersSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const dispatch = useDispatch()

  const users = useSelector(selectAllusers)
  const posts = useSelector(selectAllPosts)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  console.log("users", users)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => {
    setUserId(e.target.value)
    console.log("posts", posts)
  }

  const canSave = Boolean(title) && Boolean(content);

  const onSavePostClicked = (e) => {
    e.preventDefault()

    // ensure if the input values not empty
    canSave && dispatch(postAdded(title, content, userId))

    // clean input values after adding 
    setTitle('')
    setContent('')
  }

  console.log(userId)
  return (
    <form onSubmit={onSavePostClicked}>
      <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />
      <select value={userId} onChange={onAuthorChanged}>
        <option value=""></option>
        {usersOptions}
      </select>
      <input type="text" id='postContent' name='postContent' value={content} onChange={onContentChanged} />
      <button type='button' disabled={!canSave} onClick={onSavePostClicked}>add Post</button>
    </form>
  )
}

export default AddPostForm