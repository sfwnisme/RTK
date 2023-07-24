import { parseISO, formatDistanceToNow } from 'date-fns'
import React from 'react'

const Timestamp = ({ timestamp }) => {
  let time;
  const parse = parseISO(timestamp);
  const format = formatDistanceToNow(parse);
  time = format
  return (
    <span>{`${time} ago`}</span>
  )
}

export default Timestamp