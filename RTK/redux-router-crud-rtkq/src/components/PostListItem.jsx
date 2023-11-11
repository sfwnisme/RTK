import { memo } from 'react'

import PostsBox from './PostsBox';

let PostListItem = () => {
  return (
    < PostsBox />
  )
}

export default memo(PostListItem)