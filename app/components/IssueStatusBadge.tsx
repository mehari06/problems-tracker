import { Status} from '@prisma/client'
import React from 'react'
interface Props{
    status:Status
}
const StatusMap: Record<Status, {label:string; color:'red'|'violet'|'green'}> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    CLOSED: {label: 'Closed', color: 'red'},
};

const IssueStatusBadge = ({status}:{status:Status}) => {
  return (
    <div>IssueStatusBadge</div>
  )
}

export default IssueStatusBadge