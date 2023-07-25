import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removePost, selectAllPosts } from './postsSlice'
import Author from './Author'
import Timestamp from './Timestamp'
import ReactionsButton from './ReactionsButton'

const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()

  const renderPosts = posts.map((post, index) => (
    <article key={post.id}>
      <h2>{post.title}
        <button className='button' onClick={() => dispatch(removePost(index))}>Remove</button>
      </h2>
      <p>{post.content}</p>
      <div className='postCredit'>
        <Author userId={post.userId} />
        <Timestamp timestamp={post.date} />
      </div>
      <ReactionsButton post={post} />
    </article >))

  return (
    <div>
      <h2>Posts List</h2>
      {renderPosts}
    </div>
  )
}

export default PostsList