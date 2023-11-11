import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from './postsSlice'
import PostBox from './PostBox'

const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)
  const dispatch = useDispatch()



  useEffect(() => {
    // if (postStatus == 'idle') {
    dispatch(fetchPosts())
    // }
  }, [])

  console.log(posts)

  let content
  if (postStatus == 'idle') {
    content = ''
  } else if (postStatus == 'loading') {
    content = <h1>Loading...</h1>
  } else if (postStatus == 'succeeded') {
    content = <PostBox posts={posts} />
  } else if (postStatus == 'failed') {
    content = <mark>{error}</mark>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default PostsList