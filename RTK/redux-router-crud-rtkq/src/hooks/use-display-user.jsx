import { useGetUsersQuery } from '../api/apiSlice'

const useDisplayUser = () => {
  const { data: users } = useGetUsersQuery()

  const findThePostUser = (id) => {
    return users?.find((user) => user?.id === id)
  }

  return [findThePostUser]
}

export default useDisplayUser