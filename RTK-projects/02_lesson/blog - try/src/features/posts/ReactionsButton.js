import React from 'react'
import { addReactions } from './postsSlice'
import { useDispatch } from 'react-redux'

const reactionsEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}



const ReactionsButton = ({ post }) => {
  const dispatch = useDispatch()
  const reactionButton = Object.entries(reactionsEmoji).map(([name, emoji]) => (
    <button
      key={name}
      className='reactionButton'
      type='button'
      onClick={() => dispatch(addReactions({ postId: post.id, reaction: name }))}
    >
      {emoji} {post.reactions[name]}
    </button>
  ))
  return (
    <div>{reactionButton}</div>
  )
}

export default ReactionsButton