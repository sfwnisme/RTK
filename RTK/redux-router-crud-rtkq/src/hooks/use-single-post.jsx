import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../api/apiSlice';

const useSinglePost = () => {
  const { id } = useParams();

  const { data: record, isLoading: loading, isSuccess, isError, error } = useGetPostQuery(id)

  return { record, loading, isSuccess, isError, error };
}

export default useSinglePost