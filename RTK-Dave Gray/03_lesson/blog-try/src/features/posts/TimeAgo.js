import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ timestamp }) => {
  let time = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date)
    time = timePeriod
  }
  return (
    <span>
      <i>{time} ago</i>
    </span>
  )
}

export default TimeAgo