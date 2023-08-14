import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, selectPostById, updatePost } from './postsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllUsers } from '../users/usersSlice'

const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const post = useSelector((state) => selectPostById(state, +postId))
  const users = useSelector(selectAllUsers)

  // useState hooks
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  // handle changes
  const handleTitle = (e) => setTitle(e.target.value)
  const handleContent = (e) => setContent(e.target.value)
  const handleAuther = (e) => setUserId(+e.target.value)





  // usersOption
  const usersOption = users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)

  // on save variable
  const onSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'
  console.log('==========onSave', onSave)


  // update post function
  const onSaveButtonClicked = () => {
    if (onSave) {
      try {
        setAddRequestStatus('loading...')
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions, date: new Date().toISOString() })).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate(`/post/${post.id}`)
      } catch (err) {
        console.log(err)
      } finally {
        console.log('the process has been completed successfully')
      }
    }
  }


  return (
    <form>
      <input type='text' value={title} onChange={handleTitle} />
      <select value={userId} onChange={handleAuther}>
        <option></option>
        {usersOption}
      </select>
      <input type='text' value={content} onChange={handleContent} />
      <button type='button' onClick={onSaveButtonClicked}>Update Post</button>
    </form>
  )
}

export default EditPostForm