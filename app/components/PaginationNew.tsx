"use client";
import React from 'react';
import { Button, Flex, Text } from '@radix-ui/themes';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageCount = Math.max(1, Math.ceil(itemCount / pageSize));
  if (pageCount <= 1) return null;

  const safeCurrentPage = Number.isNaN(currentPage) ? 1 : Math.min(Math.max(currentPage, 1), pageCount);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', page.toString());
    params.set('pageSize', String(pageSize));
    const url = `${pathname}?${params.toString()}`;
    router.push(url);
  };

  return (
    <Flex align="center" gap="2" className="mt-4">
      <Text size="2">Page {safeCurrentPage} of {pageCount}</Text>

      <Button color="gray" variant="soft" disabled={safeCurrentPage === 1} onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>

      <Button color="gray" variant="soft" disabled={safeCurrentPage === 1} onClick={() => changePage(safeCurrentPage - 1)}>
        <ChevronLeftIcon />
      </Button>

      <Button color="gray" variant="soft" disabled={safeCurrentPage === pageCount} onClick={() => changePage(safeCurrentPage + 1)}>
        <ChevronRightIcon />
      </Button>

      <Button color="gray" variant="soft" disabled={safeCurrentPage === pageCount} onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
