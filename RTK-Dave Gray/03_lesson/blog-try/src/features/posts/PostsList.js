import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice'
import TimeAgo from './TimeAgo'
import PostAuthor from './PostAuthor'

const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const postError = useSelector(getPostsError)

  const dispatch = useDispatch()

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  console.log(posts)
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus])

  console.log('ldddddxsrun startl')
  let content;
  if (postStatus === 'idle') {
    content = ''
  } else if (postStatus === 'loading') {
    content = <h1>Loadding ...</h1>
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map((post) => (
      <article key={Math.random()}>
        <h2>{post.title.substring(0, 30)}</h2>
        <p>{post.body.substring(0, 200)}</p>
        <div className='post-info'>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
      </article >
    ))
  } else if (postStatus === 'failed') {
    console.log(postError)
  }

  return (
    <div>
      <h1>Posts</h1>
      {content}
    </div>
  )
}

export default PostsList