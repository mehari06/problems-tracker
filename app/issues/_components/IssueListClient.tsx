"use client"
import React, { useEffect, useState } from 'react'
import { Issue } from '@prisma/client'
import { Link, IssueStatusBadge } from '@/app/components'
import { Table, Spinner } from '@radix-ui/themes'
import { useSearchParams, usePathname } from 'next/navigation'

const fetchIssues = async (status?: string) => {
  const q = status && status !== 'all' ? `?status=${status}` : '';
  const res = await fetch(`/api/issues${q}`);
  if (!res.ok) throw new Error('Failed to fetch issues');
  return res.json() as Promise<Issue[]>;
}

export default function IssueListClient() {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') ?? undefined;
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchIssues(status)
      .then(data => { if (mounted) setIssues(data); })
      .catch(err => { if (mounted) setError(String(err)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false }
  }, [status]);

  if (loading) return <div className="py-6"><Spinner /></div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!issues) return null

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map(issue => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden"><IssueStatusBadge status={issue.status} /></div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell"><IssueStatusBadge status={issue.status} /></Table.Cell>
            <Table.Cell className="hidden md:table-cell">{new Date(issue.createdAt).toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}
