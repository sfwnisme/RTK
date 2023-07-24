import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  const dispatch = useDispatch()
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
    if (postStatus == 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch])

  console.log(posts)
  console.log("kkasdlkfjl")
  let content

  if (postStatus === 'idle') {
    content = ''
  } else if (postStatus === 'loading') {
    content = <mark>LOADING....</mark>
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post, index) => (
      <article key={index}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </article>
    ))
  } else if (postStatus === 'failed') {
    content = <strong><h1>{error}</h1></strong>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default PostsList