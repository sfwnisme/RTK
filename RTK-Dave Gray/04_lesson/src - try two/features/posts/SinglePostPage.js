import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts, selectPostById } from './postsSlice'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'
import PostAuthor from './PostAuthor'
import { Link, useParams } from 'react-router-dom'

const SinglePostPage = () => {
  const { postId } = useParams()
  // const post = useSelector((state) => selectPostById(state, postId))

  const posts = useSelector(selectAllPosts)
  console.log(posts)

  const post = posts.find((post) => post.id === +postId)

  console.log(post)

  if (!post) {
    return (
      <mark>Post Not Found..!</mark>
    )
  }

  // !post && <mark>Page Not Found ..!</mark>

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default SinglePostPage