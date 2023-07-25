import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { store } from '../../app/store';

const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)


  const dispatch = useDispatch()

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  // sorting the posts by the recent 
  // using slice to create new array
  // using [spread operator] to create new array
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  let content;

  if (postStatus === 'idle') {
    content = <h1>Loading...</h1>
  } else if (postStatus === 'succeeded') {
    content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <h1>{error}</h1>
  }


  return (
    <div>
      <h1>Posts</h1>
      {content}
    </div>
  )
}

export default PostsList