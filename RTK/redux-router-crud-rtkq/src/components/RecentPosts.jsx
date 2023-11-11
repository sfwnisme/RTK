import React, { useCallback, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink, json } from 'react-router-dom';
import Loading from '../components/Loading';
import { ButtonGroup, ListGroup } from 'react-bootstrap';
import usePosts from '../hooks/use-posts';
import { useAddPostsLimitMutation, usePostsLimitQuery } from '../api/apiSlice';

const RecentPosts = () => {
  const [EnableRecentPosts, setEnableRecentPosts] = useState(true)

  const { records, loading, isSuccess, isError, error } = usePosts()

  const [addPostsLimit] = useAddPostsLimitMutation()

  const { data } = usePostsLimitQuery()

  const displayRecentPost = useCallback(() => {
    setEnableRecentPosts(!EnableRecentPosts)
  }, [EnableRecentPosts])

  const recentPosts = records?.slice('')?.sort((a, b) => b.id - a.id)?.slice(0, data?.posts_limit)?.map((post) => (
    <ListGroup.Item key={post.id}>
      <NavLink to={`/post/${post.id}`} className='post-title'>
        {post.id}. {post.title}
      </NavLink>
    </ListGroup.Item>

  ))

  //===== handle the limitation of the posts list
  const plusMinus = useCallback((btn) => {
    const operator = btn?.target?.getAttribute('btn-data')

    switch (operator) {
      case 'plus':
        switch (data?.posts_limit) {
          case records?.length - 1:
            break;
          default:
            addPostsLimit({ "posts_limit": parseInt(data?.posts_limit) + 1 })
        }
        break;
      default:
        switch (data?.posts_limit) {
          case 1:
            break;
          default:
            addPostsLimit({ "posts_limit": parseInt(data?.posts_limit) - 1 })
        }
        break;

    }
  }, [data?.posts_limit, addPostsLimit, records?.length])

  return (
    <>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBlock: '10px' }}>
        <h5>Recent Posts<Button style={{ marginLeft: '1em' }} size='sm' variant={EnableRecentPosts ? 'link' : 'link'} onClick={displayRecentPost}>{EnableRecentPosts ? 'stash' : 'expand'}</Button></h5>

        {EnableRecentPosts && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px' }}>
          <small>limit the posts</small>
          <ButtonGroup aria-label="Basic example">
            <Button variant="primary" type="submit" size='sm' btn-data='plus' onClick={(e) => plusMinus(e)}>
              +
            </Button>
            <Button variant="danger" type="submit" size='sm' btn-data='minus' onClick={(e) => plusMinus(e)}>
              -
            </Button>
          </ButtonGroup>
        </span>
        }
      </span>
      {EnableRecentPosts && <ListGroup>
        <Loading loading={loading} isSuccess={isSuccess} error={error} isError={isError}>
          {
            recentPosts
          }
        </Loading>
      </ListGroup>
      }
      <NavLink to="/">{loading ? 'loading...' : 'More'}</NavLink>
    </>
  )
}

export default RecentPosts