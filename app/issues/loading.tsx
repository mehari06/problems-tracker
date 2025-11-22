import React from 'react'
import { Table } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import IssueActions from './list/IssueActions'

const LoadingIssuePages = () => {
  const rows = Array.from({ length: 4 })
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((_, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Skeleton className="h-4 w-40" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuePages
