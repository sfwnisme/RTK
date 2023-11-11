import React, { memo, useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import User from './User'
import { Button, ButtonGroup } from 'react-bootstrap'
import usePosts from '../hooks/use-posts'
import { useDeletePostMutation } from '../api/apiSlice'
import Loading from './Loading'
import { shortTitleUtil } from '../utils/shortTitleUtil'

let PostsBox = () => {

  // hooks
  const navigate = useNavigate()
  const { records, loading, isSuccess, isError, error } = usePosts()
  const [postId, setPostId] = useState(null)

  const [deletePost, { isLoading: deletingLoading, isSuccess: deletingIsSuccess, isError: deletingIsError }] = useDeletePostMutation()

  //===== handle delete post
  const handleDelete = useCallback((id) => {
    setPostId(id)
    deletePost(id).unwrap().then((response) => {
      console.log(`the post number ${id} has been successfully deleted`)
    }).catch((error) => {
      console.log(error, `could not deleting the post number ${id}`)
    })
  }, [deletePost])

  const handleDeletedButton = useCallback((id) => {
    if (deletingLoading) {
      if (id === postId) {
        return 'loading...'
      }
    }
    return 'Delete'
  }, [deletingLoading, postId])

  // using slice('') to create new array, because the state from the redux is immutable 
  const posts = records?.map((post) => (
    <tr key={post?.id}>
      <td>#{post?.id}</td>
      <td>
        <tr>
          <td>
            <NavLink to={`post/${post?.id}`} className='post-title'>{shortTitleUtil(post?.title, 30)}</NavLink>
          </td>
        </tr>
        <tr>
          <td>
            @{<User id={Number(parseInt(+post?.userId))} />}
          </td>
        </tr>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" onClick={() => { navigate(`post/${post?.id}/edit`) }}>Edit</Button>
          <Button variant="danger" id={post?.id} onClick={() => handleDelete(post?.id)}>{handleDeletedButton(post?.id)}</Button>
        </ButtonGroup>
      </td>
    </tr >
  ))
  return (
    <Loading loading={loading} isSuccess={isSuccess} error={error} isError={isError}>
      {posts}
    </Loading>
  )
}

PostsBox = memo(PostsBox)
export default PostsBox