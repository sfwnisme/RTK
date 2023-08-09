import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import { useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const SinglePagePost = () => {
  const { postId } = useParams()

  console.log('postId',postId)

  const post = useSelector((state) => selectPostById(state, Number(postId)))

  console.log(post)
  if (!post) {
    return (
      <div>Post Not Found</div>
    )
  }

  
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePagePost