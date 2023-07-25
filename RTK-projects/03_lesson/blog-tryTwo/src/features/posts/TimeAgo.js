import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({timestamp}) => {
  let currentDate =''
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  currentDate = timePeriod
  return (
    <div>{currentDate}</div>
  )
}

export default TimeAgo