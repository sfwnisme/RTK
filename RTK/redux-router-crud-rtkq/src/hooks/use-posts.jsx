import { useGetPostsQuery } from '../api/apiSlice'

const usePosts = () => {
  const {
    data: records,
    isLoading: loading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()

  return {
    records, loading, isSuccess,
    isError,
    error
  }
}

export default usePosts

/**NOTE
 * this HOOK represents all the post data from redux 
 * 
 */