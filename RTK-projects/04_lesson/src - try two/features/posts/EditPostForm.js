import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectPostById, updatePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const post = useSelector((state) => selectPostById(state, postId))
  const users = useSelector(selectAllUsers)

  // states
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.body)
  const [userId, setUserId] = useState(post.userId)
  const [requestStatus, setRequestStatus] = useState('idle')

  // on change states 
  const handleTitle = (e) => setTitle(e.target.value)
  const handleContent = (e) => setContent(e.target.value)
  const handleAuthor = (e) => setUserId(e.target.value)

  // users option component
  const usersOption = users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)

  // on save variable
  const onSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

  // update post function
  const onSavePostClicked = () => {
    if (onSave) {
      try {
        setRequestStatus('loading')
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions, date: new Date().toISOString() }))

        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${postId}`)

      } catch (error) {
        console.log(error)
      } finally {
        setRequestStatus('idle')
        console.log('finalize the post update process')
      }
    }
  }


  return (
    <form>
      <input type='text' value={title} onChange={handleTitle} />
      <select value={userId} defaultValue={userId} onChange={handleAuthor} >
        <option></option>
        {usersOption}
      </select>
      <input type='text' value={content} onChange={handleContent} />
      <button type='button' onClick={onSavePostClicked}>Update Post</button>
    </form>
  )
}

export default EditPostForm