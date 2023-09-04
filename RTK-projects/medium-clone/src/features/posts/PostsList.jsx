import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPosts } from './postsSlice'


const POSTS_URL = 'http://localhost:3500/blog'

const PostsList = () => {
  const { status, posts, error } = useSelector((state) => state.posts)
  const [postId, setPostId] = useState('')

  const dispatch = useDispatch()
  console.log(posts)
  console.log(status)

  useEffect(() => {
    if (status == 'idle') dispatch(fetchPosts())
  }, [status, deletePost])

  async function handleDeletePost(id) {
    let data = await axios.delete(`http://localhost:3500/blog/${id}`)
    console.log('deleted post', data)
  }

  const postsDom = posts.map((post, index) =>
    <article key={index}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <sub>{post.id}</sub>
      <button type='button' onClick={() => dispatch(deletePost(post.id))}>delete</button>
    </article>)

  return (
    <div>Posts
      {postsDom}
    </div>
  )
}

export default PostsList