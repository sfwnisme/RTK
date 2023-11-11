import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost, postAdded, selectAllPosts } from './postsSlice'
import { selectAllusers } from '../users/usersSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userId, setUserId] = useState("")
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const dispatch = useDispatch()

  const users = useSelector(selectAllusers)
  const posts = useSelector(selectAllPosts)

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))


  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = (e) => {
    e.preventDefault()

    // ensure if the input values not empty
    if (canSave) {
      try {
        setAddRequestStatus('pending')

        dispatch(addNewPost({ title, body: content, userId })).unwrap()

        setTitle('')
        setContent('')
        setUserId('')

      } catch (err) {

        console.log('addPost Error', err)
        setAddRequestStatus('failed')

      } finally {

        setAddRequestStatus('idle')
        console.log("post finaly done")

      }
    }
    // clean input values after adding 
  }

  console.log('checssk', posts)

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