import React from 'react'
import UserBox from '../users/UserBox'

const PostBox = ({ posts }) => {

  const postContent =
    posts.map((post, index) => (
      <article key={index}>
        <h2>{post.title}</h2>
        <h3>{post.body}</h3>
        <UserBox userId={post.userId} />
      </article>
    ))

  return postContent
}

export default PostBox