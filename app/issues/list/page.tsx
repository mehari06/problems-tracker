import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { Link, IssueStatusBadge } from '@/app/components'
import { Issue, Status } from '@prisma/client'
import IssueActions from './IssueActions'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

interface Props {
  searchParams: Promise<{
    status?: string;
    orderBy?: string;
    page?: string;
  }>;
}

const IssuePages = async ({ searchParams }: Props) => {
  // Await the searchParams promise
  const resolvedSearchParams = await searchParams;

  const statusParam = resolvedSearchParams?.status;
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
      { label: 'Issue', value: 'title' },
      { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
      { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ];

  const where = statusParam && statusParam !== '' && statusParam !== 'all'
    ? { status: statusParam as Status }
    : undefined;

  const orderBy = resolvedSearchParams?.orderBy
    ? { [resolvedSearchParams.orderBy]: 'asc' as const }
    : undefined;

  // parse page number safely (fallback to 1)
  const pageNumber = parseInt(resolvedSearchParams?.page ?? '1', 10);
  const currentPage = Number.isNaN(pageNumber) ? 1 : pageNumber;
  const pageSize = 10;

  // Count items and clamp currentPage within valid range
  const issueCount = await prisma.issue.count({ where });
  const pageCount = Math.max(1, Math.ceil(issueCount / pageSize));
  const clampedCurrentPage = Math.min(Math.max(currentPage, 1), pageCount);

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (clampedCurrentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink
                  href={{
                    pathname: '/issues/list',
                    query: {
                      ...resolvedSearchParams,
                      orderBy: String(column.value)
                    }
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {column.label}
                  {resolvedSearchParams?.orderBy === column.value && <ArrowUpIcon className="inline ml-1" />}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={clampedCurrentPage}
        itemCount={issueCount}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default IssuePages