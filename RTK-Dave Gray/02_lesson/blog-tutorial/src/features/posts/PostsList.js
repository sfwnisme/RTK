import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice';
import PostAuthor from './users/PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  // sorting the posts by the recent 
  // using slice to create new array
  // using [spread operator] to create new array
  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
  console.log(orderedPosts)

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <div>
      <h1>Posts</h1>
      {renderedPosts}
    </div>
  )
}

export default PostsList