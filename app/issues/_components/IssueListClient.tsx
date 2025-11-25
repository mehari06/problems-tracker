"use client"
import React, { useEffect, useState } from 'react'
import { Issue } from '@prisma/client'
import { Link, IssueStatusBadge } from '@/app/components'
import Pagination from '@/app/components/Pagination'
import { Table, Spinner } from '@radix-ui/themes'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const fetchIssues = async (status?: string, page?: number, pageSize: number = 10) => {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.set('status', status);
  params.set('page', String(page ?? 1));
  params.set('pageSize', String(pageSize));
  const q = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`/api/issues${q}`);
  if (!res.ok) throw new Error('Failed to fetch issues');
  return res.json() as Promise<{ items: Issue[]; total: number }>;
}

export default function IssueListClient() {
  const searchParams = useSearchParams();
  const status = searchParams?.get('status') ?? undefined;
  const pageParam = searchParams?.get('page');
  const parsedPage = pageParam ? parseInt(pageParam, 10) : NaN;
  const page = Number.isNaN(parsedPage) ? 1 : parsedPage;
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Primary effect: fetch on search params changes (status/page)
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchIssues(status, page, 10)
      .then(data => {
        if (mounted) {
          setIssues(data.items);
          setTotal(data.total);
        }
      })
      .catch(err => { if (mounted) setError(String(err)); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false }
  }, [status, page]);

  // Ensure the current page is within the range after we received total
  useEffect(() => {
    const pageSize = 10;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    if (page > pageCount && pageCount > 0) {
      const params = new URLSearchParams(searchParams?.toString() ?? '');
      params.set('page', pageCount.toString());
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [total, page, router, pathname, searchParams]);

  if (loading) return <div className="py-6"><Spinner /></div>
  if (error) return <div className="text-red-600">{error}</div>
  if (!issues) return null

  return (
    <>
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
      {total !== undefined && (
        <div className="mt-4">
          <Pagination pageSize={10} currentPage={page} itemCount={total} />
        </div>
      )}
    </>
  )
}
