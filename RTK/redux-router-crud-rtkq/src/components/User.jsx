import React, { memo } from 'react'
import useDisplayUser from '../hooks/use-display-user'

let User = ({ id }) => {
  const [findThePostUser] = useDisplayUser()

  console.log(id)
  return (
    <small>{findThePostUser(id)?.name}</small>
  )
}

User = memo(User)

export default User