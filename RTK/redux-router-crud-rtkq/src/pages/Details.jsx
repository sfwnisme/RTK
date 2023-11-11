import useSinglePost from '../hooks/use-single-post'
import Loading from '../components/Loading'
import { NavLink } from 'react-router-dom'
import useDisplayUser from '../hooks/use-display-user'

const Details = () => {
  const { record, loading, isSuccess, isError, error } = useSinglePost()

  const [findThePostUser] = useDisplayUser()

  return (
    <article>
      <Loading loading={loading} error={error}>
        <h4>
          {record?.title?.substring(0, 25)}...
          <span>
            no.{record?.id}
            <NavLink to='edit'>Edite</NavLink>
          </span>
        </h4>
      </Loading>
      <hr />
      <Loading loading={loading} error={error}>
        <p>{record?.body}</p>
      </Loading>
      <small>
        @{findThePostUser(record?.userId)?.name}
      </small>
    </article>
  )
}

export default Details