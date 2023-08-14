import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAllUsers } from '../users/usersSlice'
import { selectPostById, updatePost } from './postsSlice'
import { add } from 'date-fns'

const EditPost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()


  const post = useSelector((state) => selectPostById(state, +postId))
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const handleTitle = (e) => setTitle(e.target.value)
  const handleContent = (e) => setContent(e.target.value)
  const handleAuthor = (e) => setUserId(+e.target.value)

  const usersOption = users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  console.log(canSave)

  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('loading...')
        console.log({ id: post.id, title, body: content, reactions: post.reactions, userId: post.userId })
        dispatch(updatePost({ id: post.id, title, body: content, reactions: post.reactions, userId: post.userId }))
        setTitle('')
        setContent('')
        setUserId('')

        navigate(`/post/${postId}`)
      } catch (error) {
        console.log(error.message)
      } finally {
        setAddRequestStatus('idle')
        console.log('update has done')
      }
    }
  }

  return (
    <form>
      <input type='text' value={title} onChange={handleTitle} />
      <select value={userId} defaultValue={userId} onChange={handleAuthor}>
        <option></option>
        {usersOption}
      </select>
      <input type='text' value={content} onChange={handleContent} />
      <button type='button' onClick={onSavePostClicked}>Update Post</button>
    </form>
  )
}

export default EditPost