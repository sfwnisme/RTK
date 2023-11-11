import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPost, fetchPosts } from './postsSlice'

const PostForm = () => {
  const POSTS_URL = 'http://localhost:3500/blog'
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // save post function
  const savePost = () => {
    // console.log(title, body)

    // async function newPost() { await axios.post('http://localhost:3500/blog', { id: Math.random(), title, body }) }
    // newPost()
    let data = { title, body }
    console.log(data)
    navigate('/')
    dispatch(addPost(data))
  }

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <form>
      <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type='text' value={body} onChange={(e) => setBody(e.target.value)} />
      <button type='button' onClick={savePost}>Save Post</button>
    </form>
  )
}

export default PostForm