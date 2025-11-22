import { Status} from '@prisma/client'
import React from 'react'
interface Props {
  status: Status
}

const StatusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'green' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'red' },
};

const IssueStatusBadge = ({ status }: Props) => {
  const entry = StatusMap[status] ?? { label: String(status), color: 'violet' };

  const colorClasses = {
    red: 'bg-red-100 text-red-800',
    violet: 'bg-violet-100 text-violet-800',
    green: 'bg-green-100 text-green-800',
  } as const;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses[entry.color]}`}>
      {entry.label}
    </span>
  );
}

export default IssueStatusBadge