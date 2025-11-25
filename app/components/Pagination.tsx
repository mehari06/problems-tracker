"use client";
import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const pageCount = Math.max(1, Math.ceil(itemCount / pageSize));

    if (pageCount <= 1) return null;

    const safeCurrentPage = Number.isNaN(currentPage) ? 1 : Math.min(Math.max(currentPage, 1), pageCount);

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <Flex align="center" gap="2" className="mt-4">
            <Text size="2">
                Page {safeCurrentPage} of {pageCount}
            </Text>

            {/* First page button */}
            {safeCurrentPage === 1 ? (
                <button
                    disabled
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <DoubleArrowLeftIcon />
                </button>
            ) : (
                <Link
                    href={createPageURL(1)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <DoubleArrowLeftIcon />
                </Link>
            )}

            {/* Previous page button */}
            {safeCurrentPage === 1 ? (
                <button
                    disabled
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <ChevronLeftIcon />
                </button>
            ) : (
                <Link
                    href={createPageURL(safeCurrentPage - 1)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <ChevronLeftIcon />
                </Link>
            )}

            {/* Next page button */}
            {safeCurrentPage === pageCount ? (
                <button
                    disabled
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <ChevronRightIcon />
                </button>
            ) : (
                <Link
                    href={createPageURL(safeCurrentPage + 1)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <ChevronRightIcon />
                </Link>
            )}

            {/* Last page button */}
            {safeCurrentPage === pageCount ? (
                <button
                    disabled
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <DoubleArrowRightIcon />
                </button>
            ) : (
                <Link
                    href={createPageURL(pageCount)}
                    className="inline-flex items-center justify-center px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                    style={{ minWidth: '40px', minHeight: '36px' }}
                >
                    <DoubleArrowRightIcon />
                </Link>
            )}
        </Flex>
    );
};

export default Pagination;
